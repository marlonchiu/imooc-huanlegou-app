import { useState } from 'react'
import type { RegisterResponseType } from '../../types/account'
import useRequest from '../../hooks/useRequest'
import { useNavigate } from 'react-router-dom'
import { message } from '../../utils/message'

const Register = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { request } = useRequest<RegisterResponseType>({ manual: true })

  function handleRegister() {
    if (!userName) {
      message('用户名不能为空！')
      return
    }
    if (!phone) {
      message('手机号不能为空！')
      return
    }
    if (!password) {
      message('密码不能为空！')
      return
    }
    if (password.length < 6) {
      message('密码长度不能小于6！')
      return
    }
    if (password !== confirmPassword) {
      message('两次密码输入不一致！')
      return
    }
    request({
      url: '/api/register',
      method: 'POST',
      data: {
        userName,
        phone,
        password
      }
    })
      .then((res) => {
        if (res.data) {
          message('注册成功！')
          navigate('/account/login')
        }
      })
      .catch((error) => {
        message(error?.message)
      })
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
