// 登录返回结果类型
export type LoginResponseType = {
  message: string
  code: number
  data: {
    token: string
  }
}

// 注册返回结果类型
export type RegisterResponseType = {
  message: string
  code: number
  data: boolean
}
