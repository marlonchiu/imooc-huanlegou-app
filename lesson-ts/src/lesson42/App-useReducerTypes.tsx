// TypeScript 是给每一个变量、形参、函数（入参和返回值）定义明确的类型
// Hook 相关的类型定义

import { useReducer } from 'react'

const initialState = {
  count: 0
}

type ActionType = {
  type: 'ADD' | 'MINUS'
}

const reducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case 'ADD':
      return {
        count: state.count + 1
      }
    case 'MINUS':
      return {
        count: state.count - 1
      }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleAddClick = () => {
    dispatch({ type: 'ADD' })
  }
  const handleMinusClick = () => {
    dispatch({ type: 'MINUS' })
  }

  return (
    <div>
      <button onClick={handleAddClick}>button +1</button>
      <div>{state.count}</div>
      <button onClick={handleMinusClick}>button -1</button>
    </div>
  )
}

export default App
