import './style.scss'
import { createPortal } from 'react-dom'
import { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react'

export type ModalRefType = {
  showModal: (message: string) => void
}

const Modal = forwardRef((props, ref) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [message, setMessage] = useState('')

  const divElementRef = useRef(document.createElement('div'))
  const divElement = divElementRef.current

  useImperativeHandle(
    ref,
    () => {
      return {
        showModal: (message: string) => {
          setModalVisible(true)
          setMessage(message)
          setTimeout(() => {
            setModalVisible(false)
          }, 1500)
        },
        hideModal: () => {
          setModalVisible(false)
        }
      }
    },
    []
  )

  useEffect(() => {
    if (modalVisible) {
      document.body.appendChild(divElement)
    } else {
      if (divElement.parentNode) {
        document.body.removeChild(divElement)
      }
    }

    return () => {
      if (divElement.parentNode) {
        document.body.removeChild(divElement)
      }
    }
  }, [modalVisible, divElement])

  return createPortal(
    <div className="modal">
      <div className="modal-text">{message}</div>
    </div>,
    divElement
  )
})

export default Modal
