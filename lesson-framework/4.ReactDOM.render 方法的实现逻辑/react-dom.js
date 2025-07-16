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
