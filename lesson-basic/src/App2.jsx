import { useState } from 'react'
import { useImmer } from 'use-immer'

// immutable 编程规范

function App() {
  const [count, setCount] = useImmer(0)

  const [list, setList] = useState([])

  const [listOne, setListOne] = useImmer([])

  function handleClickCount() {
    // error
    // count++
    // setCount(count)
    setCount((draft) => draft + 1)
  }

  function handleListClick() {
    const newList = [...list, list.length]
    setList(newList)
  }
  function handleListOneClick() {
    setListOne((draft) => {
      draft.push(draft.length)
      console.log(123)
    })
  }

  return (
    <>
      <div onClick={handleClickCount}>{count}</div>
      <div>------------------------------------------</div>
      <div onClick={handleListClick}>增加列表项</div>
      {list.map((item) => {
        return <div key={item}>{item}</div>
      })}

      <div>------------------------------------------</div>
      <div onClick={handleListOneClick}>增加 Immer 列表项</div>
      {listOne.map((item) => {
        return <div key={item}>{item}</div>
      })}
    </>
  )
}

export default App
