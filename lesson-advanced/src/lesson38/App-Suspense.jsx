import React, { Suspense } from 'react'
// import Todos from './Todos'

const Todos = React.lazy(() => import('./Todos'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Todos />
    </Suspense>
  )
}

export default App
