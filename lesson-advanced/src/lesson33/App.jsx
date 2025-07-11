import { useSyncExternalStore } from 'react'

// 如果一个数据内容是来自于外部系统的，使用 useSyncExternalState 来实现
function subscribe(callback) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)

  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

function App() {
  const isOnline = useSyncExternalStore(subscribe, () => window.navigator.onLine)

  return <div>{isOnline.toString()}</div>
}

export default App
