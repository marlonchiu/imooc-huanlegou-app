import Guide from './containers/Guide'
import Account from './containers/Account'
import Login from './containers/Account/login'
import Register from './containers/Account/register'

import { createHashRouter, RouterProvider } from 'react-router-dom'

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
  }
])

const App = () => {
  return <RouterProvider router={router} />
}
export default App
