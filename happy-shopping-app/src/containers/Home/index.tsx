import { useState } from 'react'
import ApiTester from '../../components/ApiTester'
import MockExample from '../../components/MockExample'

function Home() {
  const [activeTab, setActiveTab] = useState<'example' | 'tester'>('example')

  return (
    <div className="page home-page" style={{ padding: '20px', fontSize: '0.2rem' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1>Mock 服务演示</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
          <button
            onClick={() => setActiveTab('example')}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === 'example' ? '#007bff' : '#f8f9fa',
              color: activeTab === 'example' ? 'white' : '#333',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            使用示例
          </button>
          <button
            onClick={() => setActiveTab('tester')}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === 'tester' ? '#007bff' : '#f8f9fa',
              color: activeTab === 'tester' ? 'white' : '#333',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            API 测试工具
          </button>
        </div>
      </div>

      {activeTab === 'example' && <MockExample />}
      {activeTab === 'tester' && <ApiTester />}
    </div>
  )
}

export default Home
