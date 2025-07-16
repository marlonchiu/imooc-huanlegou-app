// 下一个要执行的单元
let nextUnitOfWork = null

// 该函数用来处理下一个执行的单元，同时返回下下一个执行单元
function performUnitOfWork(fiber) {
  console.log('🚀 ~ performUnitOfWork ~ fiber:', fiber)

  // 1.把 fiber 对应的内容渲染到页面上
  if (!fiber.dom) {
    fiber.dom = ReactDOM.createDom(fiber)
  }
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom)
  }

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
    console.log('🚀 ~ element:', element)
    nextUnitOfWork = {
      dom: container,
      props: {
        children: [element]
      }
    }
  }
}
