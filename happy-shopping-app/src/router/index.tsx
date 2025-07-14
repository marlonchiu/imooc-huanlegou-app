import { createHashRouter } from 'react-router-dom'

import Test from '../containers/Test'
import Guide from '../containers/Guide'
import Account from '../containers/Account'
import Login from '../containers/Account/login'
import Register from '../containers/Account/register'
import Home from '../containers/Home'

import Nearby from '../containers/Nearby'
import ByLocation from '../containers/Nearby/byLocation'
import ByStore from '../containers/Nearby/byStore'

import Search from '../containers/Search'
import SearchList from '../containers/SearchList'

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
  }
])

export default router
