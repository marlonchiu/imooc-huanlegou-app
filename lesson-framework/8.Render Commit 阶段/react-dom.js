// 下一个要执行的单元
let nextUnitOfWork = null

// workInProgress 当前正在计算的 fiber 节点
let wipRoot = null

function commitWork(fiber) {
  console.log('🚀 ~ commitWork ~ fiber:', fiber)
  if (!fiber) {
    return
  }

  const parentDom = fiber.parent.dom
  parentDom.appendChild(fiber.dom)

  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function commitRoot() {
  commitWork(wipRoot.child)
  wipRoot = null
}

// 该函数用来处理下一个执行的单元，同时返回下下一个执行单元
// 用来生成 Fiber Tree 的一个函数，生成 fiber tree 的过程，在 React中叫做 render
function performUnitOfWork(fiber) {
  console.log('🚀 ~ performUnitOfWork ~ fiber:', fiber)

  // 1.把 fiber 对应的内容渲染到页面上
  if (!fiber.dom) {
    fiber.dom = ReactDOM.createDom(fiber)
  }
  // if (fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom)
  // }

  // 2.计算下一层 fiber tree 要渲染的 fiber
  const elements = fiber.props.children
  let index = 0
  let prevSibling = null
  while (index < elements.length) {
    const element = elements[index]
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    }

    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber
    index++
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
  console.log('🚀 ~ workLoop ~ deadline:', deadline, deadline.timeRemaining())
  while (nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }

  if (!nextUnitOfWork && wipRoot) {
    console.log('render commit')
    // fiber tree 已经准备好了，需要一次性的挂载 DOM
    // 一次性把 fiber tree 的内容渲染到页面上，这个过程叫做 react 中的 commit 阶段
    commitRoot()
    // requestIdleCallback(workLoop)
  }
  // requestIdleCallback(workLoop)
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
    console.log('🚀 ~ element:', element)
    wipRoot = {
      dom: container,
      props: {
        children: [element]
      }
    }

    nextUnitOfWork = wipRoot
  }
}
