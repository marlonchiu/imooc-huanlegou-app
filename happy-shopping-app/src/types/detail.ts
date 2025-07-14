export type DetailResponseType = {
  success: string
  data: {
    id: string
    imgUrl: string
    title: string
    subTitle: string
    price: number
    sales: number
    origin: string
    specification: string
    detail: string
  }
}

export type CartCountResponseType = {
  success: string
  data: {
    count: number
  }
}
