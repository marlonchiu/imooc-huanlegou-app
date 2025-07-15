import { http, HttpResponse } from 'msw'

// 导入所有mock数据
import loginData from './login.json'
import registerData from './register.json'
import homeData from './home.json'
import hotSearchData from './hotSearch.json'
import searchListData from './searchList.json'
import categoryTagsData from './categoryTags.json'
import categoryProductListData from './categoryProductList.json'
import productDetailData from './productDetail.json'
import cartData from './cart.json'
import cartCountData from './cartCount.json'
import cartListData from './cartList.json'
import cartProductInfoData from './cartProductInfo.json'
import nearbyLocationData from './nearbyLocation.json'
import nearbyStoreData from './nearbyStore.json'
import cartSubmitData from './cartSubmit.json'
import orderDetailData from './orderDetail.json'
import orderPayData from './orderPay.json'
import userAddressData from './userAddress.json'

export const handlers = [
  // 登录接口
  http.post('/api/login', () => {
    return HttpResponse.json(loginData)
  }),

  // 注册接口
  http.post('/api/register', () => {
    return HttpResponse.json(registerData)
  }),

  // 首页数据接口
  http.post('/api/home', () => {
    return HttpResponse.json(homeData)
  }),

  // 热门搜索接口
  http.get('/api/hotSearch', () => {
    return HttpResponse.json(hotSearchData)
  }),

  // 搜索列表接口
  http.get('/api/searchList', () => {
    return HttpResponse.json(searchListData)
  }),

  // 分类标签接口
  http.get('/api/categoryTags', () => {
    return HttpResponse.json(categoryTagsData)
  }),

  // 分类商品列表接口
  http.post('/api/categoryProductList', () => {
    return HttpResponse.json(categoryProductListData)
  }),

  // 商品详情接口
  http.get('/api/productDetail', () => {
    return HttpResponse.json(productDetailData)
  }),

  // 购物车接口
  http.get('/api/cart', () => {
    return HttpResponse.json(cartData)
  }),

  // 购物车数量接口
  http.get('/api/cartCount', () => {
    return HttpResponse.json(cartCountData)
  }),

  // 购物车列表接口
  http.get('/api/cartList', () => {
    return HttpResponse.json(cartListData)
  }),

  // 购物车商品信息接口
  http.get('/api/cartProductInfo', () => {
    return HttpResponse.json(cartProductInfoData)
  }),

  // 附近位置接口
  http.get('/api/nearbyLocation', () => {
    return HttpResponse.json(nearbyLocationData)
  }),

  // 附近店铺接口
  http.get('/api/nearbyStore', () => {
    return HttpResponse.json(nearbyStoreData)
  }),

  // 订单生成接口
  http.post('/api/cartSubmit', () => {
    return HttpResponse.json(cartSubmitData)
  }),

  // 订单详情接口
  http.get('/api/orderDetail', () => {
    return HttpResponse.json(orderDetailData)
  }),

  // 订单支付接口
  http.get('/api/orderPay', () => {
    return HttpResponse.json(orderPayData)
  }),

  // 用户地址接口
  http.get('/api/userAddress', () => {
    return HttpResponse.json(userAddressData)
  }),
]
