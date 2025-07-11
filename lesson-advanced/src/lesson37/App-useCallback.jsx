import { useState, useCallback } from 'react'

// useCallback 避免 render 过程反复重新生成函数
function App() {
  const [content, setContent] = useState('')

  const handleContentChange = useCallback((e) => {
    setContent(e.target.value)
  }, [])

  return <input value={content ? content : ''} onChange={handleContentChange} />
}

export default App
