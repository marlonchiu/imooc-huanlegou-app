import { useState } from 'react'
import useRequest from '../../../hooks/useRequest'

const ApiTester = () => {
  const [selectedApi, setSelectedApi] = useState('')
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const { request } = useRequest()

  const apiList = [
    { name: '登录', url: '/api/login', method: 'POST', data: { phone: '13800138000', password: '123456' } },
    {
      name: '注册',
      url: '/api/register',
      method: 'POST',
      data: { phone: '13800138000', password: '123456', userName: 'test' }
    },
    { name: '首页数据', url: '/api/home', method: 'POST' },
    { name: '热门搜索', url: '/api/hotSearch', method: 'GET' },
    { name: '搜索列表', url: '/api/searchList', method: 'GET' },
    { name: '分类标签', url: '/api/categoryTags', method: 'GET' },
    { name: '分类商品列表', url: '/api/categoryProductList', method: 'POST' },
    { name: '商品详情', url: '/api/productDetail', method: 'GET', params: { id: '88391' } },
    { name: '购物车', url: '/api/cart', method: 'GET' },
    { name: '购物车数量', url: '/api/cartCount', method: 'GET' },
    { name: '购物车列表', url: '/api/cartList', method: 'GET' },
    { name: '购物车商品信息', url: '/api/cartProductInfo', method: 'GET' },
    { name: '附近位置', url: '/api/nearbyLocation', method: 'GET' },
    { name: '附近店铺', url: '/api/nearbyStore', method: 'GET' }
  ]

  const testApi = async (api: any) => {
    setLoading(true)
    setSelectedApi(api.name)
    setResponse(null)

    try {
      const result = await request({
        url: api.url,
        method: api.method,
        data: api.data || {}
      })
      setResponse(result)
      console.log(`${api.name} API response:`, result)
    } catch (error) {
      console.error(`${api.name} API error:`, error)
      setResponse({ error: error instanceof Error ? error.message : String(error) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Mock API 测试工具</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>可用的API接口:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
          {apiList.map((api, index) => (
            <button
              key={index}
              onClick={() => testApi(api)}
              disabled={loading}
              style={{
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: selectedApi === api.name ? '#007bff' : '#f8f9fa',
                color: selectedApi === api.name ? 'white' : '#333',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px'
              }}
            >
              {api.name}
              <br />
              <small style={{ opacity: 0.8 }}>
                {api.method} {api.url}
              </small>
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>正在请求 {selectedApi} ...</p>
        </div>
      )}

      {response && (
        <div style={{ marginTop: '20px' }}>
          <h3>响应结果 ({selectedApi}):</h3>
          <pre
            style={{
              background: '#f5f5f5',
              padding: '15px',
              borderRadius: '4px',
              fontSize: '12px',
              overflow: 'auto',
              maxHeight: '400px',
              border: '1px solid #ddd'
            }}
          >
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default ApiTester
