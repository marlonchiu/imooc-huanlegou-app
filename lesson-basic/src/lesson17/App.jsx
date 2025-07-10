import { useState } from 'react'
import { PartOne, PartTwo } from './Parts'

function App() {
  const [showPartOne, setShowPartOne] = useState(true)

  return (
    <>
      <PartOne showPartOne={showPartOne} setShowPartOne={setShowPartOne} />
      <PartTwo showPartOne={showPartOne} setShowPartOne={setShowPartOne} />
    </>
  )
}

export default App
