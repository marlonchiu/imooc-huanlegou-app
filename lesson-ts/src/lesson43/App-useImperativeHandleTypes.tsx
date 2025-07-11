// TypeScript 是给每一个变量、形参、函数（入参和返回值）定义明确的类型
// Hook 相关的类型定义, forwardRef, useImperativeHandle

import { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react'

type PropsType = {
  children: ReactNode
}

type RefType = {
  start: () => void
}

const Child = forwardRef<RefType, PropsType>((props, ref) => {
  useImperativeHandle(ref, () => {
    return {
      start() {
        console.log('start')
      }
    }
  })
  return <div>{props.children}</div>
})
function App() {
  const ref = useRef<RefType>(null!)

  const handleClick = () => {
    console.log(ref.current)
    ref.current?.start()
  }

  return (
    <>
      <button onClick={handleClick}>click</button>
      <Child ref={ref}>Hello World</Child>
    </>
  )
}

export default App
