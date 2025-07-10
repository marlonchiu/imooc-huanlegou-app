import { useRef, useState } from 'react'
import InputComponent from './InputComponent'

function App() {
  const inputElement = useRef(null)

  function handleBtnClick() {
    console.log('🚀 ~ handleBtnClick ~ inputElement.current:', inputElement)
    inputElement.current.focus()
  }

  return (
    <div>
      {/* <input type="text" ref={inputElement} /> */}
      <InputComponent ref={inputElement} />
      <button onClick={handleBtnClick}>Focus</button>
    </div>
  )
}

export default App
