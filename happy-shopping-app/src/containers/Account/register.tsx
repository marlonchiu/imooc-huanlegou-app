import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function handleRegister() {
    navigate('/home')
  }

  return (
    <div className="page register-page">
      <div className="form">
        <div className="form-item">
          <div className="form-item-title">用户名</div>
          <input
            value={userName}
            className="form-item-content"
            placeholder="请输入用户名"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-item">
          <div className="form-item-title">手机号</div>
          <input
            value={phone}
            className="form-item-content"
            placeholder="请输入手机号码"
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
        <div className="form-item">
          <div className="form-item-title">确认密码</div>
          <input
            value={confirmPassword}
            type="password"
            placeholder="请输入确认密码"
            className="form-item-content"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="submit-btn" onClick={handleRegister}>
        注册
      </div>
    </div>
  )
}

export default Register
