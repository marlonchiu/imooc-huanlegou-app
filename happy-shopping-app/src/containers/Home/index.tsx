import { useEffect, useState } from 'react'
import useRequest from '../../hooks/useRequest'
import { ResponseType } from './types'
import { message } from '../../utils/message'

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
  const { request } = useRequest<ResponseType>(requestData)

  useEffect(() => {
    request(defaultRequestData).then((res) => {
      console.log(res)
      message(res.message, 3000)
    })
  }, [requestData, request])

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
          console.log(error?.message)
        },
        { timeout: 30000 }
      )
    }
  }, [location])

  return <div className="page home-page">home page</div>
}

export default Home
