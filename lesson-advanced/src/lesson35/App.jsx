import { useState, useEffect, useEffectEvent } from 'react'

// useEffectEvent 实验属性 V19.1.0还不支持

function App() {
  const [url, setUrl] = useState('http://localhost:3000')
  const [param, setParam] = useState('?name=dell')

  const request = useEffectEvent((url) => {
    console.log(`发送请求，地址是${url}${param}`)
  })

  useEffect(() => {
    request(url)
  }, [url])

  return (
    <>
      <div
        onClick={() => {
          setUrl('http://localhost:3001')
        }}
      >
        Change Url
      </div>
      <div
        onClick={() => {
          setParam('?name=lee')
        }}
      >
        Change Param
      </div>
    </>
  )
}

export default App
