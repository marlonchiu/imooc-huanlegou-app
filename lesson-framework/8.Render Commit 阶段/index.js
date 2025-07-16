const element = (
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
ReactDOM.render(element, root)
