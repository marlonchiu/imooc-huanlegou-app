import { useImmerReducer } from 'use-immer'
import AddItem from './AddItem'
import ItemList from './ItemList'
import DataContext from './dataContext'
import DispatchContext from './dispatchContext'
import dataReducer from './dataReducer'

function App() {
  const [data, dispatch] = useImmerReducer(dataReducer, {
    inputValue: '',
    list: []
  })

  return (
    <>
      <DataContext.Provider value={data}>
        <DispatchContext.Provider value={dispatch}>
          <AddItem />
          <ItemList />
        </DispatchContext.Provider>
      </DataContext.Provider>
    </>
  )
}

export default App
