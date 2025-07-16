import './style.scss'
import { useEffect, useState } from 'react'
import type {
  ShopListItemType,
  CartListResponseType,
  CartSubmitProductType,
  CartSubmitResponseType
} from '../../types/cart'
import useRequest from '../../hooks/useRequest'
import Docker from '../../components/Docker'
import { message } from '../../utils/message'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const navigate = useNavigate()
  const [cartList, setCartList] = useState<ShopListItemType[]>([])
  const [allChecked, setAllChecked] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const { request: cartListRequest } = useRequest<CartListResponseType>({ manual: true })
  const { request: cartSubmitRequest } = useRequest<CartSubmitResponseType>({ manual: true })

  useEffect(() => {
    cartListRequest({
      url: '/api/cartList',
      method: 'GET'
    })
      .then((res) => {
        const cartList = res.data
          ? res.data.map((item) => ({
              ...item,
              isChecked: false
            }))
          : []
        setCartList(cartList)
      })
      .catch((e) => {
        message(e.message)
      })
  }, [cartListRequest])

  useEffect(() => {
    // 存在未全选的情况
    const notAllChecked = cartList.find((shop) => !shop.isChecked)
    setAllChecked(!notAllChecked)
  }, [cartList])

  // 计算购物车总价
  useEffect(() => {
    console.log('计算购物车总价')

    const calcCount = cartList.reduce((total, shop) => {
      return (
        total +
        shop.cartList.reduce((total, item) => {
          return total + (item.isChecked ? Number(item.count) : 0)
        }, 0)
      )
    }, 0)

    const calcPrice = cartList.reduce((total, shop) => {
      return (
        total +
        shop.cartList.reduce((total, item) => {
          return total + (item.isChecked ? Number(item.price) * Number(item.count) : 0)
        }, 0)
      )
    }, 0)
    setTotalCount(calcCount)
    setTotalPrice(Number(calcPrice.toFixed(2)))
  }, [cartList])

  const handleCountChange = (shopId: string, productId: string, count: string) => {
    const newCartList = [...cartList]
    const shop = newCartList.find((shop) => shop.shopId === shopId)
    shop?.cartList.forEach((product) => {
      if (product.productId === productId) {
        product.count = +count ? Number(count) : 0
      }
    })
    setCartList(newCartList)
  }

  // 店铺选中
  const handleShopClick = (shopId: string) => {
    const newCartList = [...cartList]
    const shop = newCartList.find((shop) => shop.shopId === shopId)
    if (shop) {
      shop.isChecked = !shop.isChecked
      shop.cartList.forEach((product) => {
        product.isChecked = !product.isChecked
      })
      setCartList(newCartList)
    }
  }

  // 商品选中
  const handleProductClick = (shopId: string, productId: string) => {
    const newCartList = [...cartList]
    const shop = newCartList.find((shop) => shop.shopId === shopId)
    if (shop) {
      let shopChecked = true
      shop.cartList.forEach((product) => {
        if (product.productId === productId) {
          product.isChecked = !product.isChecked
        }
        if (!product.isChecked) {
          shopChecked = false
        }
      })
      shop.isChecked = shopChecked
      setCartList(newCartList)
    }
  }

  // 全选
  const handleAllChecked = () => {
    const newCartList = [...cartList]
    newCartList.forEach((shop) => {
      shop.isChecked = !allChecked
      shop.cartList.forEach((product) => {
        product.isChecked = !allChecked
      })
    })
    setCartList(newCartList)
  }

  const handleCartSubmit = () => {
    if (!totalCount) {
      message('您没有勾选任何购物车中的商品，无法创建订单~')
      return
    }

    const params: CartSubmitProductType = []
    cartList.forEach((shop) => {
      shop.cartList.forEach((product) => {
        if (product.isChecked) {
          params.push({
            productId: product.productId,
            count: product.count
          })
        }
      })
    })
    console.log(params)

    cartSubmitRequest({
      url: '/api/cartSubmit',
      method: 'POST',
      data: params
    })
      .then((res) => {
        message('下单成功')
        const { orderId } = res.data
        navigate(`/order/${orderId}`)
      })
      .catch((e) => {
        message(e.message)
      })
  }

  return (
    <div className="page cart-page">
      <div className="cart-page-header flex-row flex-center">购物车</div>

      <div className="cart-page-content flex-column">
        {(cartList || []).map((shop) => {
          return (
            <div key={shop.shopId} className="cart-page-item">
              <div className="shop-title flex-row flex-align-center">
                <span
                  className={shop.isChecked ? 'radio is-checked' : 'radio'}
                  onClick={() => handleShopClick(shop.shopId)}
                />
                <span className="iconfont">&#xe676;</span>
                <span className="shop-title-text">{shop.shopName}</span>
              </div>
              {(shop.cartList || []).map((cartItem) => {
                return (
                  <div
                    key={cartItem.productId}
                    className="product-item flex-row flex-align-center"
                    onClick={() => handleProductClick(shop.shopId, cartItem.productId)}
                  >
                    <span className={cartItem.isChecked ? 'radio is-checked' : 'radio'} />
                    <img src={cartItem.imgUrl} alt="" />
                    <div className="product-item-info flex-column">
                      <span className="product-name">{cartItem.title}</span>
                      <span className="product-weight">{cartItem.weight}</span>
                      <div className="product-price">
                        <span className="yen">&yen;</span>
                        <span>{cartItem.price}</span>
                      </div>
                      <div className="product-operate flex-row">
                        {/* <span className="product-operate-item flex-row flex-center">-</span> */}
                        <input
                          value={cartItem.count}
                          className="product-operate-input"
                          onChange={(event) => handleCountChange(shop.shopId, cartItem.productId, event?.target.value)}
                          onClick={(event) => event.stopPropagation()}
                        />
                        {/* <span className="product-operate-item flex-row flex-center">+</span> */}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      <div className="cart-page-bottom flex-row flex-align-center">
        <span className={allChecked ? 'radio is-checked' : 'radio'} onClick={() => handleAllChecked()} />
        <span className="select-all">全选</span>
        <div className="total flex-row">
          <span className="total-text">合计：</span>
          <div className="total-price">
            <span className="yen">&yen;</span>
            <span>{totalPrice}</span>
          </div>
        </div>
        <div className="settle-btn flex-row flex-center" onClick={handleCartSubmit}>
          结算（{totalCount}）
        </div>
      </div>

      <Docker activeName="cart" />
    </div>
  )
}

export default Cart
