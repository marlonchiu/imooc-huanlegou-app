// TypeScript 是给每一个变量、形参、函数（入参和返回值）定义明确的类型
// Hook 相关的类型定义, useContext

import { createContext, useContext, useState } from 'react'

type GenderType = {
  value: 'male' | 'female'
}

const GenderContext = createContext<GenderType>({ value: 'male' })

// -------------------------------------------------

const ChildComponent = () => {
  const gender = useContext(GenderContext)
  return <div>Dell is {gender.value}</div>
}

// --------------------------------------------------

const App = () => {
  const [gender, setGender] = useState<GenderType>({ value: 'male' })

  const handleClick = () => {
    setGender({ value: 'female' })
  }

  return (
    <GenderContext.Provider value={gender}>
      <button onClick={handleClick}>TOGGLE</button>
      <ChildComponent />
    </GenderContext.Provider>
  )
}

export default App
