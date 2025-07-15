# Mock 服务使用说明

本项目已集成 MSW (Mock Service Worker) 来提供 mock 数据服务，可以在开发环境中模拟真实的 API 请求。

## 功能特性

- ✅ 自动拦截 `/api/*` 路径的请求
- ✅ 返回 `src/mock/` 目录下的 JSON 数据
- ✅ 支持 GET 和 POST 请求
- ✅ 只在开发环境中启用
- ✅ 不影响其他网络请求

## 可用的 API 接口

| 接口名称 | 请求方法 | 路径 | 数据文件 |
|---------|---------|------|----------|
| 登录 | POST | `/api/login` | `login.json` |
| 注册 | POST | `/api/register` | `register.json` |
| 首页数据 | GET | `/api/home` | `home.json` |
| 热门搜索 | GET | `/api/hotSearch` | `hotSearch.json` |
| 搜索列表 | GET | `/api/searchList` | `searchList.json` |
| 分类标签 | GET | `/api/categoryTags` | `categoryTags.json` |
| 分类商品列表 | POST | `/api/categoryProductList` | `categoryProductList.json` |
| 商品详情 | GET | `/api/productDetail` | `productDetail.json` |
| 购物车 | GET | `/api/cart` | `cart.json` |
| 购物车数量 | GET | `/api/cartCount` | `cartCount.json` |
| 购物车列表 | GET | `/api/cartList` | `cartList.json` |
| 购物车商品信息 | GET | `/api/cartProductInfo` | `cartProductInfo.json` |
| 附近位置 | GET | `/api/nearbyLocation` | `nearbyLocation.json` |
| 附近店铺 | GET | `/api/nearbyStore` | `nearbyStore.json` |

## 使用方法

### 1. 在组件中使用

```typescript
import useRequest from '../../hooks/useRequest'

function MyComponent() {
  const { request } = useRequest()

  const fetchData = async () => {
    try {
      const result = await request({
        url: '/api/home',
        method: 'GET'
      })
      console.log('API response:', result)
    } catch (error) {
      console.error('API error:', error)
    }
  }

  return (
    <div>
      <button onClick={fetchData}>获取首页数据</button>
    </div>
  )
}
```

### 2. 测试 Mock 接口

启动开发服务器后，访问首页即可看到 API 测试工具，可以测试所有可用的 mock 接口。

```bash
pnpm start
```

### 3. 添加新的 Mock 接口

1. 在 `src/mock/` 目录下创建新的 JSON 文件
2. 在 `src/mock/handlers.ts` 中添加对应的路由处理器

```typescript
// 在 handlers.ts 中添加新接口
http.get('/api/newEndpoint', () => {
  return HttpResponse.json(newEndpointData)
}),
```

## 文件结构

```
src/mock/
├── README.md              # 使用说明
├── handlers.ts            # MSW 路由处理器
├── browser.ts             # 浏览器端 worker 配置
├── login.json             # 登录接口数据
├── register.json          # 注册接口数据
├── home.json              # 首页数据
├── hotSearch.json         # 热门搜索数据
├── searchList.json        # 搜索列表数据
├── categoryTags.json      # 分类标签数据
├── categoryProductList.json # 分类商品列表数据
├── productDetail.json     # 商品详情数据
├── cart.json              # 购物车数据
├── cartCount.json         # 购物车数量数据
├── cartList.json          # 购物车列表数据
├── cartProductInfo.json   # 购物车商品信息数据
├── nearbyLocation.json    # 附近位置数据
└── nearbyStore.json       # 附近店铺数据
```

## 注意事项

1. Mock 服务只在开发环境 (`NODE_ENV=development`) 中启用
2. 生产环境中不会加载 mock 服务，请求会正常发送到真实的后端服务
3. 修改 JSON 文件后需要刷新页面才能看到更新
4. 如果需要模拟网络延迟，可以在 handlers.ts 中添加延迟逻辑

## 调试

在浏览器开发者工具的 Console 中，你可以看到：
- `[MSW] Mocking enabled.` 表示 mock 服务已启用
- 每个被拦截的请求都会有相应的日志输出
