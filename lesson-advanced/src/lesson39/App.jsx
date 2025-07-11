import { useState, useDeferredValue, memo } from 'react'

const Todos = memo(({ text }) => {
  const items = []
  for (let i = 0; i < 100; i++) {
    items.push(<div key={i}>{text}</div>)
  }
  const startTime = new Date().getTime()
  while (new Date().getTime() - startTime < 60) {}
  return <div>{items}</div>
})

function App() {
  const [inputValue, setInputValue] = useState('')
  const deferredInputValue = useDeferredValue(inputValue)

  const handleChangeInput = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <>
      <input value={inputValue || ''} onChange={handleChangeInput} />
      <Todos text={deferredInputValue} />
    </>
  )
}

export default App
