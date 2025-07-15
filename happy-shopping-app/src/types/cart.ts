// 加入购物车返回数据type
export type CartChangeResponseType = {
  success: string
  data: boolean
}

type CartItemType = {
  productId: string
  imgUrl: string
  weight: string
  title: string
  price: number
  count: number
  isChecked?: boolean
}

export type ShopListItemType = {
  shopId: string
  shopName: string
  isChecked?: boolean
  cartList: Array<CartItemType>
}

export type CartListResponseType = {
  message: string
  data: Array<ShopListItemType>
}

export type CartSubmitProductType = Array<{
  productId: string
  count: number
}>

export type CartSubmitResponseType = {
  message: string
  data: {
    orderId: string
  }
}
