import React, { Suspense } from 'react'
import Todos from './Todos'

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Todos />
    </Suspense>
  )
}

export default App
