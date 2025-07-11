import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useRequest from '../../hooks/useRequest'
import { LoginResponseType } from './types'
import Modal, { ModalRefType } from '../../components/Modal'

const Login = () => {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const modalRef = useRef<ModalRefType>(null!)

  // 通过泛型传递给 useRequest 方法
  const { request, cancel } = useRequest<LoginResponseType>()

  function handleLogin() {
    if (!phone) {
      modalRef.current.showModal('请输入手机号码！')
      return
    }
    if (!password) {
      modalRef.current.showModal('密码不能为空！')
      return
    }

    modalRef.current.showModal('登录中...')
    request({
      url: '/api/login',
      method: 'POST',
      data: { phone, password }
    })
    //   .then((res) => {
    //   localStorage.setItem('token', res.data.token)
    // })
    cancel()
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
      <Modal ref={modalRef} />
    </div>
  )
}

export default Login
