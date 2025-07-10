import { useState } from 'react'

// UI 节点位置上的内容发生变化时，原始组件会被销毁
// 组件在页面上被销毁，状态会被清空

function Counter({ useColor }) {
  const [count, setCount] = useState(0)

  return (
    <div
      style={{ color: useColor ? 'red' : 'black' }}
      onClick={() => {
        setCount(count + 1)
      }}
    >
      {count}
    </div>
  )
}

export default Counter
