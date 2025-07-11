import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosRequestConfig } from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  // 发送请求相关状态
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  function handleLogin() {
    axios
      .get('/api/a.json')
      .then((res) => {
        console.log('🚀 ~ .then ~ res:', res)
        setData(res.data)
        setLoaded(true)
      })
      .catch((err) => {
        console.log('🚀 ~ handleLogin ~ err:', err)
        setError(err.message)
        setLoaded(true)
      })
    // navigate('/home')
  }

  if (loaded) {
    setLoaded(false)
    if (data) {
      console.log('请求成功', data)
    } else {
      console.log('请求失败', error)
    }
  }

  return (
    <div className="page login-page">
      <div className="form">
        <div className="form-item">
          <div className="form-item-title">手机号</div>
          <input
            value={phone}
            placeholder="请输入手机号码"
            className="form-item-content"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-item">
          <div className="form-item-title">密码</div>
          <input
            value={password}
            type="password"
            placeholder="请输入密码"
            className="form-item-content"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="submit-btn" onClick={handleLogin}>
        登录
      </div>
      <div className="notice-text">*登录即表示您赞同使用条款及隐私政策</div>
    </div>
  )
}

export default Login
