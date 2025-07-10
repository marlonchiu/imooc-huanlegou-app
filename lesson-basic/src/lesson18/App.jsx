import { useState } from 'react'
import Counter from './Counter'

function App() {
  const [useColor, setUseColor] = useState(true)
  const [show, setShow] = useState(true)

  return (
    <div>
      <Counter />
      {show ? <Counter /> : null}
      {useColor ? <Counter useColor={useColor} /> : <Counter />}
      <button
        onClick={() => {
          setShow(!show)
        }}
      >
        Button
      </button>
    </div>
  )
}

export default App
