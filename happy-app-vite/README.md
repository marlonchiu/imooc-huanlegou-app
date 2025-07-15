# 欢乐购 - Happy Shopping App

这是一个基于 React + TypeScript + Vite 的购物应用，集成了 MSW (Mock Service Worker) 来提供 mock 数据服务。

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
# 或者
pnpm start
```

应用将在开发模式下运行，打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看。

页面会在你编辑代码时自动重新加载，Vite 提供了极快的热更新体验。

### 运行测试

```bash
pnpm test
```

启动 Vitest 测试运行器。

### 构建生产版本

```bash
pnpm build
```

构建应用到 `dist` 文件夹，优化生产环境的性能。

### 预览生产构建

```bash
pnpm preview
```

本地预览生产构建版本。

### 代码检查

```bash
pnpm lint
```

运行 ESLint 检查代码质量。

## 🎯 Mock 服务功能

本项目已集成 MSW (Mock Service Worker) 来提供完整的 mock 数据服务：

### ✨ 特性

- 🔄 自动拦截 `/api/*` 路径的请求
- 📁 返回 `src/mock/` 目录下的 JSON 数据
- 🌐 支持 GET 和 POST 请求
- 🔧 只在开发环境中启用
- 🚀 不影响其他网络请求

### 📋 可用的 API 接口

| 接口名称       | 请求方法 | 路径                       | 说明               |
| -------------- | -------- | -------------------------- | ------------------ |
| 登录           | POST     | `/api/login`               | 用户登录           |
| 注册           | POST     | `/api/register`            | 用户注册           |
| 首页数据       | GET      | `/api/home`                | 首页轮播图、分类等 |
| 热门搜索       | GET      | `/api/hotSearch`           | 热门搜索关键词     |
| 搜索列表       | GET      | `/api/searchList`          | 商品搜索结果       |
| 分类标签       | GET      | `/api/categoryTags`        | 商品分类标签       |
| 分类商品列表   | GET      | `/api/categoryProductList` | 分类下的商品       |
| 商品详情       | GET      | `/api/productDetail/:id`   | 商品详细信息       |
| 购物车         | GET      | `/api/cart`                | 购物车信息         |
| 购物车数量     | GET      | `/api/cartCount`           | 购物车商品数量     |
| 购物车列表     | GET      | `/api/cartList`            | 购物车商品列表     |
| 购物车商品信息 | GET      | `/api/cartProductInfo`     | 购物车商品详情     |
| 附近位置       | GET      | `/api/nearbyLocation`      | 附近位置信息       |
| 附近店铺       | GET      | `/api/nearbyStore`         | 附近店铺列表       |

### 🛠️ 使用方法

1. **在组件中使用现有的 useRequest hook：**

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

  return <button onClick={fetchData}>获取数据</button>
}
```

2. **测试 Mock 接口：**

启动开发服务器后，访问首页可以看到：

- **使用示例**：展示如何在实际组件中使用 mock 接口
- **API 测试工具**：可以测试所有可用的 mock 接口

### 📁 Mock 文件结构

```
src/mock/
├── README.md              # Mock 服务详细说明
├── handlers.ts            # MSW 路由处理器
├── browser.ts             # 浏览器端 worker 配置
├── *.json                 # 各种 mock 数据文件
```

### 🔧 添加新的 Mock 接口

1. 在 `src/mock/` 目录下创建新的 JSON 文件
2. 在 `src/mock/handlers.ts` 中添加对应的路由处理器

```typescript
// 在 handlers.ts 中添加新接口
http.get('/api/newEndpoint', () => {
  return HttpResponse.json(newEndpointData)
}),
```

## 🛠️ 技术栈

- **构建工具**: Vite 7.x - 极快的构建工具和开发服务器
- **前端框架**: React 19.x + TypeScript
- **路由**: React Router DOM 7.x
- **样式**: Sass/SCSS + CSS Modules
- **UI 组件**: Antd Mobile 5.x
- **HTTP 客户端**: Axios
- **Mock 服务**: MSW (Mock Service Worker)
- **测试**: Vitest + Testing Library
- **代码检查**: ESLint + TypeScript ESLint
- **包管理**: pnpm

## 🏗️ 构建和部署

### 开发环境

Vite 提供了极快的开发体验：

- ⚡ 极快的冷启动
- 🔥 即时的热模块替换 (HMR)
- 🛠️ 丰富的功能支持
- 📦 优化的构建输出

### 生产构建

```bash
pnpm build
```

构建应用到 `dist` 文件夹，Vite 会：

- 使用 Rollup 进行生产优化
- 自动代码分割
- 压缩和优化资源
- 生成 source maps

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
