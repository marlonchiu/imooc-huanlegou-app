import { useState, useEffect } from 'react'
function App() {
  const [name, setName] = useState('dell')
  const [age, setAge] = useState(12)

  // 1. 使用 Effect,首先要用 useEffect 进行定义，此时，每次 render 过后，其内容都会执行
  // 2. useEffect Hook 第二个函数参数，可以限定 Effect 的执行时机，参数值是数组，如果是空数组，表示：只有在第一次渲染的时候执行，如果数组里有其他内容的时候，表示其他内容发生变化时，effect 内容需要被执行。
  useEffect(() => {
    // 请求外部数据
    fetch('http://localhost:3000/a.json').then(() => {
      console.log('abc')
    })
  }, [name])

  function handleNameClick() {
    // setName('lee')
    setAge(13)
  }

  return (
    <div onClick={handleNameClick}>
      {name}:{age}
    </div>
  )
}

export default App
