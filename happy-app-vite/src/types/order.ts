import { ShopListItemType } from './cart'

export type AddressItemType = {
  id: string
  name: string
  phone: string
  address: string
}

type TimeItemType = {
  label: string
  value: string
}

type TimeType = Array<TimeItemType>

export type ResponseDataType = {
  money: number
  timeRange: Array<TimeType>
  address: AddressItemType
  time: string[]
  total: number
  shop: Array<ShopListItemType>
}

export type DetailResponseType = {
  message: string
  data: ResponseDataType
}

export type AddressResponseType = {
  message: string
  data: Array<AddressItemType>
}

export type PaymentResponseType = {
  message: string
  data: boolean
}
