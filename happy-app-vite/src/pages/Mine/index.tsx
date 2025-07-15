import './style.scss'
import { useNavigate } from 'react-router-dom'
import Docker from '../../components/Docker'

function Mine() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/account/login')
  }

  return (
    <div className="page mine-page">
      <div className="title">个人中心</div>

      {/* 退出登录 */}
      <div className="logout-btn" onClick={handleLogout}>
        退出登录
      </div>

      <Docker activeName="mine" />
    </div>
  )
}

export default Mine
