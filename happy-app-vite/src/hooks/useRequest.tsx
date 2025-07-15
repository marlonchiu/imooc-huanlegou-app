import { useCallback, useEffect, useRef, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { useNavigate } from 'react-router-dom'
import { message } from '../utils/message'

const defaultOptions = { url: '/', method: 'GET', data: {}, params: {} }

function useRequest<T>(options: AxiosRequestConfig & { manual?: boolean } = defaultOptions) {
  const [data, setData] = useState<T | null>(null!)
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  const navigate = useNavigate()
  const controllerRef = useRef(new AbortController())

  const cancel = () => {
    controllerRef.current.abort()
  }

  const request = useCallback(
    (requestOptions: AxiosRequestConfig) => {
      // 清空上次请求状态
      setData(null)
      setError('')
      setLoaded(false)

      const token = localStorage.getItem('token')
      const headers = token ? { token } : {}

      return axios
        .request<T>({
          ...requestOptions,
          headers,
          signal: controllerRef.current.signal
        })
        .then((response) => {
          setData(response.data)
          return response.data
        })
        .catch((error: any) => {
          if (error?.response?.status === 403) {
            localStorage.removeItem('token')
            navigate('/account/login')
          }
          setError(error.message || 'unknown request error')
          throw new Error(error)
        })
        .finally(() => {
          setLoaded(true)
        })
    },
    [navigate]
  )

  useEffect(() => {
    if (!options.manual) {
      request(options).catch((error: any) => {
        message(error?.message)
      })
    }
  }, [request, options])

  return { data, error, loaded, request, cancel }
}

export default useRequest
