// TypeScript 是给每一个变量、形参、函数（入参和返回值）定义明确的类型
// Hook 相关的类型定义

import { useEffect, useRef } from 'react'


type RefType = number | null
function App() {
  // const ref = useRef<number | null>(null)
  const ref = useRef<RefType>(null)

  useEffect(() => {
    ref.current = window.setTimeout(() => {
      console.log('timer')
    }, 1000)
    return clearTimeout(ref.current)
  }, [])

  return <div>123123</div>
}

export default App

// function App() {
//   const ref = useRef<HTMLDivElement>(null!)

//   function handleDivClick() {
//     console.log(ref.current?.innerHTML)
//   }

//   return (
//     <div ref={ref} onClick={handleDivClick}>
//       123123
//     </div>
//   )
// }

// export default App
