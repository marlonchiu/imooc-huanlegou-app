import { useState, useRef, forwardRef, useEffect, useImperativeHandle } from 'react'

const UserInput = forwardRef((props, ref) => {
  const inputRef = useRef(null)
  // 父组件调用子组件的 DOM 时，能够对 DOM 节点上的返回内容中转做一层限制
  useImperativeHandle(
    ref,
    () => {
      return {
        blur() {
          inputRef.current.blur()
        },
        value: inputRef.current.value
      }
    },
    []
  )

  const [value, setValue] = useState('dell')
  return (
    <input
      ref={inputRef}
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value)
      }}
    />
  )
})

function App() {
  const ref = useRef(null)

  useEffect(() => {
    console.log(ref.current.value)
    // ref.current.focus()
  }, [])

  return <UserInput ref={ref} />
}

export default App
