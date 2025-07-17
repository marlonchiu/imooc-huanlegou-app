let element = (
  <div>
    <h1>
      <p>Paragraph</p>
      <a href="https://react.dev">Link</a>
    </h1>
    <h2>Subtitle</h2>
  </div>
)

// babel 转化后
console.log('babel 转化后', element)
const root = document.getElementById('root')
console.log('=== 第一次渲染开始 ===')
ReactDOM.render(element, root)

// 延迟第二次渲染，确保第一次渲染完成
setTimeout(() => {
  console.log('=== 第二次渲染开始 ===')
  element = (
    <div>
      <h1>Paragraph updated</h1>
      <h2>Subtitle</h2>
    </div>
  )
  ReactDOM.render(element, root)
}, 100)
