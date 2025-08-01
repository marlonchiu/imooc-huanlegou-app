import './style.scss'
import { useNavigate } from 'react-router-dom'

const dockerItems = [
  {
    name: 'home',
    url: '/home',
    icon: '&#xe6f9;',
    text: '首页'
  },
  {
    name: 'category',
    url: '/category',
    icon: '&#xe603;',
    text: '分类'
  },
  {
    name: 'cart',
    url: '/cart',
    icon: '&#xe826;',
    text: '购物车'
  },
  {
    name: 'mine',
    url: '/mine',
    icon: '&#xe691;',
    text: '我的'
  }
]

function Docker(props: { activeName: string }) {
  const navigate = useNavigate()
  const { activeName } = props

  return (
    <div className="docker">
      {dockerItems.map((item) => (
        <div
          key={item.name}
          className={
            activeName === item.name
              ? 'docker-item is-active'
              : 'docker-item '
          }
          onClick={() => {
            navigate(item.url)
          }}
        >
          <p
            className="iconfont"
            dangerouslySetInnerHTML={{
              __html: item.icon
            }}
          ></p>
          <p className="docker-item-title">{item.text}</p>
        </div>
      ))}
    </div>
  )
}
export default Docker
