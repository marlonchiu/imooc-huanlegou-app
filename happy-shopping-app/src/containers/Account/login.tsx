import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRequest from '../../hooks/useRequest'
import { LoginResponseType } from './types'
import { message } from '../../utils/message'

const Login = () => {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  // 通过泛型传递给 useRequest 方法
  const { request } = useRequest<LoginResponseType>()

  function handleLogin() {
    if (!phone) {
      message('请输入手机号码！')
      return
    }
    if (!password) {
      message('密码不能为空！')
      return
    }

    request({
      url: '/api/login',
      method: 'POST',
      data: { phone, password }
    })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem('token', res.data.token)
          navigate('/home')
        }
      })
      .catch((error) => {
        message(error?.message)
      })
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
