// Strict Mode 严格模式，在 Effect 中的执行逻辑
// render 函数渲染完成后，useEffect 会开始判断是否执行
import { useState, useEffect, useMemo } from 'react'

function App() {
  const list = ['Do homework', 'Clean Rooms', 'Coding', 'Watering Flower']
  const [name, setName] = useState('')
  const [search, setSearch] = useState('')
  console.log('step 1')

  // useMemo 相当于做了一个缓存
  // useMemo 是在render 运行的过程中执行的
  const filteredList = useMemo(() => {
    console.log('step 2')
    return list.filter((item) => item.indexOf(search) > -1)
    // eslint-disable-next-line
  }, [search])

  // useEffect 是在 render 结束后再执行的
  useEffect(() => {
    console.log('step 3')
  }, [])

  console.log('step 4')

  return (
    <div>
      <div>
        name:{' '}
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
      </div>
      <div>
        search:{' '}
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
      </div>
      <div>
        <select>
          {filteredList.map((item) => {
            return <option key={item}>{item}</option>
          })}
        </select>
      </div>
    </div>
  )
}

export default App
