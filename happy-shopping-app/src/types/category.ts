export type CategoryType = {
  id: string
  name: string
}

export type TagType = string

export type CategoryTagResponseType = {
  message: string
  data: {
    category: Array<CategoryType>
    tag: Array<TagType>
  }
}

export type ProductType = {
  id: string
  imgUrl: string
  name: string
  price: number
  sales: number
}

export type CategoryProductListResponseType = {
  message: string
  data: Array<ProductType>
}

export type CartProductType = {
  id: string
  imgUrl: string
  name: string
  price: number
  count: number
}

export type CartProductResponseType = {
  message: string
  data: CartProductType
}
