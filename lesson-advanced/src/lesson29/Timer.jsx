// 1. 清除 Effect 引入的临时内容，避免内存泄漏
import { useState, useEffect } from 'react'

function Timer() {
  const [time, setTime] = useState(new Date().getTime())

  useEffect(() => {
    // 第一次渲染后，每隔 1s 变化一次时间戳
    const timer = setInterval(() => {
      setTime(new Date().getTime())
    }, 1000)

    // 组件销毁后，清理定时器
    return () => {
      console.log('clear process....')
      clearInterval(timer)
    }
  }, [])

  return <div>{time}</div>
}

export default Timer
