const element = (
  <div title="Hello Welcome">
    <p style="color:red">Dell</p>
    <b>Lee</b>
  </div>
)

// babel 转化后
console.log('babel 转化后', element)
const root = document.getElementById('root')
ReactDOM.render(element, root)
