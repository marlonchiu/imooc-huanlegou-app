// 1. 组件存在的整个过程称为一个生命周期
// 挂载(mount) -> 更新（update）-> 卸载(unmount)
// 组件的挂载和销毁只有一次
// 2. Effect 存在的整个过程称为一个生命周期
// 创建执行 -> 销毁
// 组件里的 Effect 的挂载和销毁可能会有很多次
// 3. Effect 和 Event 的区别是什么呢？
// Effect 是有依赖数据驱动执行的，Event 一定是由用户操作行为驱动执行的

import { useState, useEffect } from 'react'

function App() {
  const [userName, setUserName] = useState('dell')

  useEffect(() => {
    console.log('excute')
    return () => {
      console.log('destroy')
    }
  }, [userName])

  console.log('render')

  return (
    <div
      onClick={() => {
        setUserName('lee')
      }}
    >
      hello
    </div>
  )
}

export default App
