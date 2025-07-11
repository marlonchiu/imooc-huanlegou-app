// Strict Mode 严格模式，在 Effect 中的执行逻辑
// render 函数渲染完成后，useEffect 会开始判断是否执行
import { useState, useEffect } from 'react'

function App() {
  const [time, setTime] = useState(new Date().getTime())

  // timer 在严格开发模式下，需要进行清理
  // useEffect(() => {
  //   console.log(123)
  //   const timer = setInterval(() => {
  //     setTime(new Date().getTime())
  //   }, 1000)
  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])

  // 全局事件绑定在严格开发模式下，需要进行清理
  // useEffect(() => {
  //   function onScroll() {
  //     console.log('scroll')
  //   }
  //   window.addEventListener('scroll', onScroll)
  //   console.log('add event')

  //   return () => {
  //     window.removeEventListener('scroll', onScroll)
  //   }
  // }, [])

  // DOM 操作在严格模式下，需要进行清理
  useEffect(() => {
    const originBackground = window.document.body.style.background
    window.document.body.style.background = 'red'
    return () => {
      window.document.body.style.background = originBackground
    }
  }, [])

  return <div style={{ height: '5000px' }}>{time}</div>
}

export default App
