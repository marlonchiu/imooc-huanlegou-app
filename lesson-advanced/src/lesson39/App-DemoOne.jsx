import React, { Suspense, useState, lazy, useDeferredValue } from 'react'
// const Todos = React.lazy(() => import('./Todos'))

const Todos = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(import('./Todos'))
    }, 1000)
  })
})

const Hello = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(import('./Hello'))
    }, 1000)
  })
})

// useDeferredValue 执行流程

// 1. isHello 变为 false
// 2. 加载 Todos 组件
// 3. deferredIsHello 从 true 变为 false
// 4. Component 根据 deferredIsHello 从 Hello 变成 Todos 这个组件

function App() {
  const [isHello, setIsHello] = useState(true)

  const deferredIsHello = useDeferredValue(isHello)

  const Component = deferredIsHello ? Hello : Todos

  return (
    <>
      <button
        onClick={() => {
          setIsHello(false)
        }}
      >
        Toggle
      </button>
      <Suspense fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
    </>
  )
}

export default App
