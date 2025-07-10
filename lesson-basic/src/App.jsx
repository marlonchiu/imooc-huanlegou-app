import { useState } from 'react'
import { useImmer } from 'use-immer'

// 从命令式开发到声明式开发
// 命令式：你一步步指路，告诉出租车司机怎么回家
// 声明式：你告诉出租车司机，你家在哪，出租车司机会自动的把车开到家门口

// 1. 避免数据冗余重复
// 2. 同类型数据尽量合并
// 3. 数据结构能浅不深

function App() {
  const [user, setUser] = useImmer({
    firstName: '',
    lastName: ''
  })

  function handleFirstNameChange(e) {
    setUser((draft) => {
      draft.firstName = e.target.value
    })
  }

  function handleLastNameChange(e) {
    setUser((draft) => {
      draft.lastName = e.target.value
    })
  }

  return (
    <>
      First Name: <input onChange={handleFirstNameChange} />
      Last Name <input onChange={handleLastNameChange} />
      Full Name: {user.firstName + '-' + user.lastName}
    </>
  )
}

export default App
