import { useContext } from 'react'
import DataContext from './dataContext'
import DispatchContext from './dispatchContext'

function AddItem() {
  // 从 context 获取数据
  const data = useContext(DataContext)
  const dispatch = useContext(DispatchContext)

  // Input 输入内容的事件函数
  function handleInputChange(e) {
    const action = { type: 'changeInput', value: e.target.value }
    dispatch(action)
  }

  function handleButtonClick() {
    const action = { type: 'addItem' }
    dispatch(action)
  }

  return (
    <div className="item-add">
      <div>
        <input value={data.inputValue} onChange={handleInputChange} />
        <button onClick={handleButtonClick}>提交</button>
      </div>
    </div>
  )
}

export default AddItem
