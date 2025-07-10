function dataReducer(state, action) {
  const newState = { ...state }
  switch (action.type) {
    case 'changeInput':
      newState.inputValue = action.value
      return newState
    case 'addItem':
      newState.list = [
        ...newState.list,
        {
          id: state.inputValue,
          value: state.inputValue
        }
      ]
      newState.inputValue = ''
      return newState
    case 'deleteItem':
      newState.list = [...newState.list]
      newState.list.splice(action.value, 1)
      return newState
    default:
      return state
  }
}

export default dataReducer
