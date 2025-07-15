import { createHashRouter } from 'react-router-dom'

import Test from '../pages/Test'
import Guide from '../pages/Guide'
import Account from '../pages/Account'
import Login from '../pages/Account/login'
import Register from '../pages/Account/register'
import Home from '../pages/Home'

import Nearby from '../pages/Nearby'
import ByLocation from '../pages/Nearby/byLocation'
import ByStore from '../pages/Nearby/byStore'

import Search from '../pages/Search'
import SearchList from '../pages/SearchList'

import Detail from '../pages/Detail'
import Category from '../pages/Category'
import Cart from '../pages/Cart'
import Order from '../pages/Order'
import Mine from '../pages/Mine'

const router = createHashRouter([
  {
    path: '/test',
    element: <Test />
  },
  {
    path: '/',
    element: <Guide />
  },
  {
    path: '/account',
    element: <Account />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/nearby',
    element: <Nearby />,
    children: [
      {
        path: '/nearby/bylocation',
        element: <ByLocation />
      },
      {
        path: '/nearby/bystore',
        element: <ByStore />
      }
    ]
  },
  {
    path: '/search/:shopId',
    element: <Search />
  },
  {
    path: '/searchlist/:shopId/:keyword',
    element: <SearchList />
  },
  {
    path: '/detail/:id',
    element: <Detail />
  },
  {
    path: '/category',
    element: <Category />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/order/:id',
    element: <Order />
  },
  {
    path: '/mine',
    element: <Mine />
  },
  {
    path: '*',
    element: <Home />
  }
])

export default router
