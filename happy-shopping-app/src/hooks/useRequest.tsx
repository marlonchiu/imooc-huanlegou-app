import { useCallback, useEffect, useRef, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

const defaultOptions = { url: '/', method: 'GET', data: {}, params: {} }

function useRequest<T>(options: AxiosRequestConfig = defaultOptions) {
  const [data, setData] = useState<T | null>(null!)
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  const controllerRef = useRef(new AbortController())

  const cancel = () => {
    controllerRef.current.abort()
  }

  const request = useCallback((requestOptions: AxiosRequestConfig) => {
    // 清空上次请求状态
    setData(null)
    setError('')
    setLoaded(false)

    return axios
      .request<T>({
        ...requestOptions,
        signal: controllerRef.current.signal
      })
      .then((response) => {
        setData(response.data)
        return response.data
      })
      .catch((error: any) => {
        setError(error.message || 'unknown request error')
        throw new Error(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  return { data, error, loaded, request, cancel }
}

export default useRequest
