import { useState, useEffect } from 'react'
import useRequest from '../../hooks/useRequest'

// 定义数据类型
interface HomeData {
  message: string
  data: {
    location: {
      id: string
      address: string
    }
    banners: Array<{
      id: string
      imgUrl: string
    }>
    categories: Array<{
      id: string
      name: string
      imgUrl: string
    }>
  }
}

interface HotSearchData {
  message: string
  data: Array<{
    id: string
    name: string
  }>
}

const MockExample = () => {
  const [homeData, setHomeData] = useState<HomeData | null>(null)
  const [hotSearchData, setHotSearchData] = useState<HotSearchData | null>(null)
  const [loading, setLoading] = useState(false)
  const { request } = useRequest()

  // 获取首页数据
  const fetchHomeData = async () => {
    setLoading(true)
    try {
      const result = await request({
        url: '/api/home',
        method: 'GET'
      })
      setHomeData(result as HomeData)
      console.log('首页数据:', result)
    } catch (error) {
      console.error('获取首页数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 获取热门搜索数据
  const fetchHotSearchData = async () => {
    setLoading(true)
    try {
      const result = await request({
        url: '/api/hotSearch',
        method: 'GET'
      })
      setHotSearchData(result as HotSearchData)
      console.log('热门搜索数据:', result)
    } catch (error) {
      console.error('获取热门搜索数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 模拟登录
  const handleLogin = async () => {
    setLoading(true)
    try {
      const result = await request({
        url: '/api/login',
        method: 'POST',
        data: {
          phone: '13800138000',
          password: '123456'
        }
      })
      console.log('登录结果:', result)
      const loginResult = result as any
      alert('登录成功！Token: ' + loginResult.data.token)
    } catch (error) {
      console.error('登录失败:', error)
      alert('登录失败')
    } finally {
      setLoading(false)
    }
  }

  // 页面加载时自动获取数据
  useEffect(() => {
    fetchHomeData()
    fetchHotSearchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Mock 服务使用示例</h2>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginRight: '10px'
          }}
        >
          {loading ? '处理中...' : '测试登录'}
        </button>

        <button
          onClick={fetchHomeData}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginRight: '10px'
          }}
        >
          刷新首页数据
        </button>

        <button
          onClick={fetchHotSearchData}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          刷新热门搜索
        </button>
      </div>

      {/* 首页数据展示 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>首页数据</h3>
        {homeData ? (
          <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '4px' }}>
            <p>
              <strong>当前位置:</strong> {homeData.data.location.address}
            </p>
            <div>
              <strong>轮播图:</strong>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                {homeData.data.banners.map((banner) => (
                  <img
                    key={banner.id}
                    src={banner.imgUrl}
                    alt="banner"
                    style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>暂无数据</p>
        )}
      </div>

      {/* 热门搜索展示 */}
      <div>
        <h3>热门搜索</h3>
        {hotSearchData ? (
          <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '4px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {hotSearchData.data.map((item) => (
                <span
                  key={item.id}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    borderRadius: '20px',
                    fontSize: '14px'
                  }}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p>暂无数据</p>
        )}
      </div>
    </div>
  )
}

export default MockExample
