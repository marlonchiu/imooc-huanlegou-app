import 'swiper/css'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { LocationType, BannersType } from '../../../types/home'
import { useNavigate } from 'react-router-dom'

type bannerPropsType = {
  location: LocationType | undefined
  banners: BannersType | undefined
}

const Banner = (props: bannerPropsType) => {
  const { banners, location } = props
  const [index, setIndex] = useState(1)
  const navigate = useNavigate()

  const handleLocation = () => {
    // navigate('/nearby/bylocation')
  }

  const handleSearchClick = () => {
    // navigate(`/search/${location?.id}`)
  }

  return (
    <div className="banner">
      {/* 当前地址 */}
      <div className="location" onClick={handleLocation}>
        <span className="iconfont">&#xe790;</span>
        <span>{location?.address}</span>
      </div>

      {/* 搜索框 */}
      <div className="search" onClick={handleSearchClick}>
        <span className="iconfont">&#xe610;</span>
        <span>请输入你需要搜索的内容</span>
      </div>

      {/* 轮播图 */}
      <div className="swiper-area">
        <Swiper spaceBetween={0} slidesPerView={1} onSlideChange={(e: any) => setIndex(e.activeIndex + 1)}>
          {(banners || []).map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <div className="swiper-item">
                  <img src={item.imgUrl} alt="" />
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>

        {banners?.length ? (
          <div className="pagination">
            <span>
              {index}/{banners.length || 0}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Banner
