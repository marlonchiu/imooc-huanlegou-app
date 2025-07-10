import { useState } from 'react'
import Email from './Email'

// UI 节点位置上的内容发生变化时，原始组件会被销毁（低优先级）
// 当存在 Key 值时，不管 UI 节点位置的内容是否变化，只要 Key 发生了变化，原始组件就会被销毁（高优先级）

// 列表中 key 值的作用主要是提升列表渲染的效率

function App() {
  const [to, setTo] = useState('dell')

  const [list, setList] = useState([
    { uuid: '12312312', value: 1 },
    { uuid: '123123', value: 2 },
    { uuid: '123sdfdsf', value: 3 }
  ])

  return (
    <div>
      <Email to={to} key={to} />
      <button
        onClick={() => {
          setTo('lee')
        }}
      >
        button
      </button>
      {list.map((item) => (
        <p key={item.uuid}>{item.value}</p>
      ))}
    </div>
  )
}

export default App
