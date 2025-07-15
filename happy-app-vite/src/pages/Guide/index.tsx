import './style.scss'
import { useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import haloLogoIcon from '../../images/halo_logo_icon.png'
import sloganWordIcon from '../../images/slogan_word_icon.png'

const Guide = () => {
  // 处理动画逻辑
  const ref = useRef<HTMLDivElement>(null!)
  useEffect(() => {
    ref.current.style.opacity = '1'
  }, [])

  // 处理路由跳转逻辑
  const navigate = useNavigate()
  const handleClick = useCallback(() => {
    if (localStorage.getItem('token')) {
      navigate('/home')
    } else {
      navigate('/account/login')
    }
  }, [navigate])

  return (
    <div ref={ref} className="guide-page">
      <img src={haloLogoIcon} className="guide-icon" alt="" />
      <p className="guide-title">欢乐购</p>

      <img src={sloganWordIcon} className="slogan-icon" alt="" />

      <div className="iconfont" onClick={handleClick}>
        &#xe60c;
      </div>
    </div>
  )
}

export default Guide
