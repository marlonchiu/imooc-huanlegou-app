import { useState } from 'react'

function App() {
  console.log('excute')
  const [userInfo, setUserInfo] = useState({ name: 'Tom', age: 18 })

  const handleClick = () => {
    setUserInfo({ name: 'Jerry', age: 20 })
  }
  return <div onClick={handleClick}>{userInfo.name}</div>
}

export default App
