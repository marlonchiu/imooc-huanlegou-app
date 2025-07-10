import { useContext } from 'react'
import DataContext from './dataContext'
import DispatchContext from './dispatchContext'

function ItemList() {
  // 从 context 获取数据
  const data = useContext(DataContext)
  const dispatch = useContext(DispatchContext)

  function handleItemClick(index) {
    const action = { type: 'deleteItem', value: index }
    dispatch(action)
  }

  return (
    <div className="item-list">
      <ul>
        {data.list.map((item, index) => {
          return (
            <li key={item.key} onClick={() => handleItemClick(index)}>
              {item.value}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ItemList
