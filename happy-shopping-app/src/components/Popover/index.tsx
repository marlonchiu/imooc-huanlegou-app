import './style.scss'
import { ReactNode } from 'react'

const Popover = (props: { show: boolean; outsideClickCallback: () => void; children: ReactNode }) => {
  const { show, outsideClickCallback, children } = props

  return show ? (
    <div className="popover">
      <div className="popover-mask" onClick={outsideClickCallback} />
      <div className="popover-content">{children}</div>
    </div>
  ) : null
}

export default Popover
