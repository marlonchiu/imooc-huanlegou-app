import { useState, useEffect } from 'react'

// 如果一个数据内容是来自于外部系统的，使用 useSyncExternalState 来实现，而不要使用下面这种实现方式

function App() {
  const [isOnline, setIsOnline] = useState(true)

  function updateState() {
    setIsOnline(window.navigator.onLine)
  }

  useEffect(() => {
    window.addEventListener('online', updateState)
    window.addEventListener('offline', updateState)
    return () => {
      window.removeEventListener('online', updateState)
      window.removeEventListener('offline', updateState)
    }
  }, [])

  return <div>{isOnline.toString()}</div>
}

export default App
