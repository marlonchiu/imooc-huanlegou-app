import './style.scss'
import { useEffect, useState } from 'react'
import type { ResponseType } from '../../types/home'
import useRequest from '../../hooks/useRequest'
import { message } from '../../utils/message'
import Banner from './components/Banner'
import Category from './components/Category'
import Card from './components/Card'
import Docker from '../../components/Docker'

// 默认请求参数
const defaultRequestData = {
  url: '/api/home',
  method: 'POST',
  data: {
    latitude: 37,
    longitude: -122
  }
}

function Home() {
  const locationHistory = localStorage.getItem('location')
  const location = locationHistory ? JSON.parse(locationHistory) : null

  if (location) {
    defaultRequestData.data.longitude = location.longitude
    defaultRequestData.data.latitude = location.latitude
  }

  const [requestData, setRequestData] = useState(defaultRequestData)
  const { data } = useRequest<ResponseType>(requestData)
  console.log('🚀 ~ Home ~ data:', data)

  // 获取经纬度
  useEffect(() => {
    if (navigator.geolocation && !location) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position)
          const { coords } = position
          const { latitude, longitude } = coords
          localStorage.setItem('location', JSON.stringify({ latitude, longitude }))

          setRequestData({
            ...defaultRequestData,
            data: { latitude, longitude }
          })
        },
        (error: any) => {
          message(error?.message)
        },
        { timeout: 3000 }
      )
    }
  }, [location])

  return (
    <div className="page home-page">
      {/* 头部轮播 */}
      <Banner location={data?.data.location} banners={data?.data.banners} />

      {/* 品类 */}
      <Category categories={data?.data.categories} />

      {/* 新品尝鲜 */}
      <Card title="新品尝鲜" list={data?.data.freshes} />

      {/* 限时折扣 */}

      {/* 猜你喜欢 */}

      {/* 底部 */}
      <div className="bottom">—— 我是有底线的 ——</div>

      <Docker activeName="home" />
    </div>
  )
}

export default Home
