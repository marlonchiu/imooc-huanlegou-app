import { useContext } from 'react'
import nameContext from '../nameContext'

function Content() {
  const name = useContext(nameContext)
  return <div style={{ marginLeft: '100px' }}>Content: {name}</div>
}

export default Content
