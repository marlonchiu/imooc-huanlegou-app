import { useState, memo, useTransition } from 'react'

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
  const [deferredInputValue, setDeferredInputValue] = useState('')

  // 创建一个延迟执行的过程，延迟执行是指等到浏览器空闲的时候再执行
  const [isPending, startTransition] = useTransition()

  const handleChangeInput = (e) => {
    setInputValue(e.target.value)
    startTransition(() => {
      setDeferredInputValue(e.target.value)
    })
  }

  return (
    <>
      <input value={inputValue || ''} onChange={handleChangeInput} />
      {isPending ? <div>Loading...</div> : <Todos text={deferredInputValue} />}
    </>
  )
}

export default App
