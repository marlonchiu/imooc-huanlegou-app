function dataReducer(draft, action) {
  console.log("🚀 ~ dataReducer ~ action:", action)
  switch (action.type) {
    case 'changeInput':
      draft.inputValue = action.value
      return draft
    case 'addItem':
      draft.list.push({
        key: draft.inputValue,
        value: draft.inputValue
      })
      draft.inputValue = ''
      return draft
    case 'deleteItem':
      draft.list.splice(action.value, 1)
      return draft
    default:
      return draft
  }
}

export default dataReducer
