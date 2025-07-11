import { useState } from 'react'
import Timer from './Timer'
function App() {
  const [showTimer, setShowTimer] = useState(false)

  function handleBtnClick() {
    const showState = !showTimer
    setShowTimer(showState)
  }

  return (
    <div>
      {showTimer ? <Timer /> : null}
      <button onClick={handleBtnClick}>Toggle</button>
    </div>
  )
}

export default App
