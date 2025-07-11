import { createHashRouter } from 'react-router-dom'

import Guide from '../containers/Guide'
import Account from '../containers/Account'
import Login from '../containers/Account/login'
import Register from '../containers/Account/register'
import Home from '../containers/Home'

const router = createHashRouter([
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
  }
])

export default router
