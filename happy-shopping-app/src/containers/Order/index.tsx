import './style.scss'
import type {
  DetailResponseType,
  ResponseDataType,
  AddressItemType,
  AddressResponseType,
  PaymentResponseType
} from '../../types/order'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import { Picker } from 'antd-mobile'

import useRequest from '../../hooks/useRequest'
import { message } from '../../utils/message'
import Popover from '../../components/Popover'

function Order() {
  const { request: orderDetailRequest } = useRequest<DetailResponseType>({ manual: true })
  const [orderData, setOrderData] = useState<ResponseDataType | null>(null)

  const { request: addressRequest } = useRequest<AddressResponseType>({ manual: true })
  const [showAddress, setShowAddress] = useState(false)
  const [addressList, setAddressList] = useState<AddressItemType[]>([])

  const { request: paymentRequest } = useRequest<PaymentResponseType>({ manual: true })
  const [showPayment, setShowPayment] = useState(false)
  const [payWay, setPayWay] = useState('weixin')

  const [showTimeRange, setShowTimeRange] = useState(false)

  const params = useParams<{ id: string }>()

  const navigate = useNavigate()

  useEffect(() => {
    orderDetailRequest({
      url: '/api/orderDetail',
      method: 'GET',
      params: { id: params.id }
    })
      .then((response) => {
        setOrderData(response.data)
      })
      .catch((e) => {
        message(e.message)
      })
  }, [params, orderDetailRequest])

  function handleReceiverClick() {
    setShowAddress(true)
    addressRequest({
      url: '/api/userAddress',
      method: 'GET'
    })
      .then((response) => {
        setAddressList(response.data)
      })
      .catch((e) => {
        message(e.message)
      })
  }

  function handleAddressClick(address: AddressItemType) {
    if (orderData) {
      const newData = { ...orderData }
      newData.address = address
      setOrderData(newData)
    }
    setShowAddress(false)
  }

  function handleOrderSubmit() {
    const orderId = params.id
    const addressId = orderData?.address.id
    const time = orderData?.time
    paymentRequest({
      method: 'POST',
      url: '/api/orderPay',
      data: {
        orderId,
        addressId,
        time,
        payWay
      }
    })
      .then((response) => {
        if (response.data) {
          navigate('/home')
        } else {
          message('支付失败')
        }
      })
      .catch((e) => {
        message(e.message)
      })
  }

  return orderData ? (
    <div className="page order-page">
      <div className="title">确认订单</div>
      <div className="receiver" onClick={handleReceiverClick}>
        <div className="iconfont">&#xe650;</div>
        <div className="receiver-content">
          <div className="receiver-name">
            收货人: {orderData.address.name}
            <span className="receiver-phone">{orderData.address.phone}</span>
          </div>
          <div className="receiver-address">收货人地址: {orderData.address.address}</div>
        </div>
      </div>
      <div className="delivery">
        <div className="delivery-text">送达时间</div>
        <div
          className="delivery-select"
          onClick={() => {
            setShowTimeRange(true)
          }}
        >
          {orderData.time?.[0]} {orderData.time?.[1]}:{orderData.time?.[2]}
        </div>
      </div>
      {orderData.shop.map((shop) => (
        <div key={shop.shopId}>
          <div className="shop">
            <div className="shop-title">
              <span className="iconfont">&#xe6d8;</span>
              {shop.shopName}
            </div>
            <div className="shop-products">
              {shop.cartList.map((product) => (
                <div className="shop-product" key={product.productId}>
                  <img src={product.imgUrl} alt={product.title} className="shop-product-img" />
                  <div className="shop-product-content">
                    <div className="shop-product-title">{product.title}</div>
                    <div className="shop-product-kilo">{product.weight}</div>
                  </div>
                  <div className="shop-product-order">
                    <div>&yen;{product.price}</div>
                    <div>X{product.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="footer">
        <div className="footer-total">
          合计：
          <span className="footer-total-price">
            <span className="footer-total-yen">&yen;</span>
            {orderData.total}
          </span>
        </div>
        <div
          className="footer-submit"
          onClick={() => {
            setShowPayment(true)
          }}
        >
          提交订单
        </div>
      </div>
      <Popover
        show={showAddress}
        outsideClickCallback={() => {
          setShowAddress(false)
        }}
      >
        <div className="address-popover">
          <div className="address-popover-title">选择地址</div>
          {addressList?.map((address) => (
            <div className="address-item" key={address.id} onClick={() => handleAddressClick(address)}>
              <div className="address-item-name">
                收货人: {address.name}
                <span className="address-item-phone">{address.phone}</span>
              </div>
              <div className="address-item-address">收货人地址: {address.address}</div>
            </div>
          ))}
        </div>
      </Popover>
      <Popover
        show={showPayment}
        outsideClickCallback={() => {
          setShowPayment(false)
        }}
      >
        <div className="payment-popover">
          <div className="payment-popover-title">选择地址</div>
          <div className="payment-popover-price">&yen; {orderData.total}</div>
          <div className="payment-popover-products">
            <div
              className="payment-popover-product"
              onClick={() => {
                setPayWay('weixin')
              }}
            >
              <img className="payment-popover-img" src="http://statics.dell-lee.com/shopping/weixin.png" alt="微信" />
              微信
              <div className={payWay === 'weixin' ? 'radio radio-active' : 'radio'}></div>
            </div>
            <div
              className="payment-popover-product"
              onClick={() => {
                setPayWay('cash')
              }}
            >
              <img className="payment-popover-img" src="http://statics.dell-lee.com/shopping/cash.png" alt="微信" />
              余额（{orderData.money}）<div className={payWay === 'cash' ? 'radio radio-active' : 'radio'}></div>
            </div>
          </div>
          <div className="payment-popover-button" onClick={handleOrderSubmit}>
            立即支付
          </div>
        </div>
      </Popover>
      {/* <Picker
        columns={orderData.timeRange || []}
        visible={showTimeRange}
        onClose={() => {
          setShowTimeRange(false)
        }}
        value={orderData?.time}
        onConfirm={(value) => {
          if (data) {
            const newData = { ...data }
            newData.time = value as string[]
            setOrderData(newData)
          }
          setShowTimeRange(false)
        }}
      /> */}
    </div>
  ) : null
}

export default Order
