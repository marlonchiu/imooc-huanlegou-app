// 下一个要执行的单元
let nextUnitOfWork = null

// workInProgress 当前正在计算的 fiber 节点
let wipRoot = null

// 存储上一次渲染对应的 FiberTree Root
let currentRoot = null

// 存储本次渲染需要删除的 fiber 节点
let deletions = []

const isEvent = (key) => key.startsWith('on')
const isProperty = (key) => key !== 'children' && !isEvent(key)
const isNew = (prev, next) => (key) => prev[key] !== next[key]
const isGone = (next) => (key) => !(key in next)

// 当 DOM 可以复用时 复用DOM节点的逻辑
function updateDom(dom, preProps, nextProps) {
  // 清除老的或者被改变的dom节点 事件函数
  Object.keys(preProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(preProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2)
      dom.removeEventListener(eventType, preProps[name])
    })

  // 清除老的DOM属性
  Object.keys(preProps)
    .filter(isProperty)
    .filter(isGone(nextProps))
    .forEach((name) => (dom[name] = null))

  // 设置新的 或者修改老的DOM属性
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(preProps, nextProps))
    .forEach((name) => (dom[name] = nextProps[name]))

  // 添加事件监听
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(preProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2)
      dom.addEventListener(eventType, nextProps[name])
    })
}

// 专门处理删除操作的函数
function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    // 如果 fiber 有对应的 DOM 节点，直接删除
    try {
      domParent.removeChild(fiber.dom)
      console.log('SUCCESSFULLY DELETED DOM for', fiber.type)
    } catch (error) {
      console.warn('Failed to remove DOM for', fiber.type, error)
    }
  } else {
    // 如果 fiber 没有对应的 DOM 节点（比如函数组件），递归删除子节点
    commitDeletion(fiber.child, domParent)
  }
}

function commitWork(fiber) {
  // console.log('🚀 ~ commitWork ~ fiber:', fiber)
  if (!fiber) {
    return
  }
  console.log('🚀 ~ commitWork ~ fiber.effectTag:', fiber.effectTag)

  // 找到有 DOM 节点的父级
  let domParentFiber = fiber.parent

  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent
  }

  const domParent = domParentFiber.dom

  if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
    // console.log('EXECUTING PLACEMENT for', fiber.type)
    domParent.appendChild(fiber.dom)
    updateDom(fiber.dom, {}, fiber.props)
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
    // console.log('EXECUTING UPDATE for', fiber.type)
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  } else if (fiber.effectTag === 'DELETION') {
    // console.log('EXECUTING DELETION for', fiber.type)
    commitDeletion(fiber, domParent)
    return // 删除操作不需要继续处理子节点
  }

  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

// commit 函数 用于一次性更新DOM
function commitRoot() {
  deletions.forEach(commitWork)
  console.log('🚀 ~ commitRoot ~ wipRoot:', wipRoot.child)
  commitWork(wipRoot.child)
  currentRoot = wipRoot
  wipRoot = null
}

// 调协函数
function reconcileChildren(wipFiber, elements) {
  let index = 0
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child
  let prevSibling = null

  while (index < elements.length || oldFiber != null) {
    // 1.fiber ,fiber 合并成一个大树，删掉老fiber 上需要删除的东西
    const element = elements[index]
    let newFiber = null

    const sameType = oldFiber && element && element.type === oldFiber.type

    if (sameType) {
      // 更新 origin dom
      newFiber = {
        type: element.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE'
      }
      // console.log('✅ Created UPDATE fiber for', element.type)
    }

    if (element && !sameType) {
      // 添加
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT'
      }
      // console.log('✅ Created PLACEMENT fiber for', element.type)
    }

    if (oldFiber && !sameType) {
      // 删除
      oldFiber.effectTag = 'DELETION'
      deletions.push(oldFiber)
      // console.log('✅ Marked DELETION fiber for', oldFiber.type)
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    // 只有当 newFiber 存在时才进行链接操作
    if (newFiber) {
      if (index === 0) {
        wipFiber.child = newFiber
      } else if (prevSibling) {
        prevSibling.sibling = newFiber
      }
      prevSibling = newFiber
    }

    index++
  }
}

function updateHostComponent(fiber) {
  // 1.把 fiber 对应的内容渲染到页面上
  if (!fiber.dom) {
    fiber.dom = ReactDOM.createDom(fiber)
  }

  // 2.计算下一层 fiber tree 要渲染的 fiber
  const elements = fiber.props.children
  reconcileChildren(fiber, elements)
}

let wipFiber = null
let hookIndex = null

function updateFunctionComponent(fiber) {
  wipFiber = fiber
  hookIndex = 0
  wipFiber.hooks = []
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}

// 该函数用来处理下一个执行的单元，同时返回下下一个执行单元
// 用来生成 Fiber Tree 的一个函数，生成 fiber tree 的过程，在 React中叫做 render
function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function
  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }

  // 3.选择下一个要执行的 fiber 单元
  if (fiber.child) {
    return fiber.child
  }

  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}

// 自动调度
function workLoop(deadline) {
  // console.log('🚀 ~ workLoop ~ deadline:', deadline, deadline.timeRemaining())
  // 处理工作单元

  while (nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }

  // 提交阶段
  if (!nextUnitOfWork && wipRoot) {
    console.log('@@@@@@@@@@@@@@@@@render commit')
    // fiber tree 已经准备好了，需要一次性的挂载 DOM
    // 一次性把 fiber tree 的内容渲染到页面上，这个过程叫做 react 中的 commit 阶段
    commitRoot()
  }

  // 确保持续调度
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

const ReactDOM = {
  createDom: function (fiber) {
    // 创建合理的元素节点
    const dom = fiber.type === 'TEXT_NODE' ? document.createTextNode('') : document.createElement(fiber.type)
    // 给元素节点添加属性
    Object.keys(fiber.props)
      .filter((key) => key !== 'children')
      .forEach((key) => (dom[key] = fiber.props[key]))

    return dom
  },
  render: function (element, container) {
    wipRoot = {
      dom: container,
      props: {
        children: [element]
      },
      alternate: currentRoot
    }
    deletions = []
    nextUnitOfWork = wipRoot
  },
  useState: function (initial) {
    const oldHook = wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex]
    const hook = {
      state: oldHook ? oldHook.state : initial,
      queue: []
    }

    const actions = (oldHook && oldHook.queue) || []
    actions.forEach((action) => {
      hook.state = action(hook.state)
    })

    // 调用 setState 的逻辑，重新渲染，并且存储 setState 函数的action
    const setState = (action) => {
      hook.queue.push(action)
      wipRoot = {
        dom: currentRoot.dom,
        props: currentRoot.props,
        alternate: currentRoot
      }
      nextUnitOfWork = wipRoot
      deletions = []
      // scheduleUpdate()
    }

    wipFiber.hooks.push(hook)
    hookIndex++
    return [hook.state, setState]
  }
}
