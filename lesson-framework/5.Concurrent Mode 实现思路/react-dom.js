// 下一个要执行的单元
let nextUnitOfWork = {}

// 该函数用来处理下一个执行的单元，同时返回下下一个执行单元
function performUnitOfWork(nextUnitOfWork) {
  console.log('🚀 ~ performUnitOfWork ~ nextUnitOfWork:', nextUnitOfWork)
  // return nextUnitOfWork.props.children
  return null
  return nextUnitOfWork.props.children
}

// 自动调度
function workLoop(deadline) {
  console.log('🚀 ~ workLoop ~ deadline:', deadline, deadline.timeRemaining())
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

const ReactDOM = {
  render: function (element, container) {
    console.log('🚀 ~ element:', element)
    // 创建合理的元素节点
    const dom = element.type === 'TEXT_NODE' ? document.createTextNode('') : document.createElement(element.type)
    // 给元素节点添加属性
    Object.keys(element.props)
      .filter((key) => key !== 'children')
      .forEach((key) => (dom[key] = element.props[key]))

    // 使用children属性做递归
    element.props.children.forEach((child) => ReactDOM.render(child, dom))
    container.appendChild(dom)
  }
}
