import { useState } from 'react'
import Header from './Header'
import Body from './Body'
import nameContext from './nameContext'

function App() {
  const [user, setUser] = useState('hello world...')

  function handleHeaderChange() {
    setUser('Dell Lee')
  }

  return (
    <div>
      <nameContext.Provider value={user}>
        <Header onChange={handleHeaderChange} />
        {/* <nameContext.Provider value="hello world"> */}
        <Body />
        {/* </nameContext.Provider> */}
      </nameContext.Provider>
    </div>
  )
}

export default App
