import request from './request'
import type { LoginForm, LoginResponse } from '@/types/auth'

const mockLogin = (data: LoginForm): Promise<LoginResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (data.username === 'admin' && data.password === '123456') {
        resolve({
          code: 200,
          message: '登录成功',
          data: {
            token: 'mock_token_' + Date.now(),
            user: {
              id: '1',
              username: 'admin',
              name: '管理员',
              role: 'admin'
            }
          }
        })
      } else {
        resolve({
          code: 401,
          message: '用户名或密码错误',
          data: null
        })
      }
    }, 500)
  })
}

export const login = (data: LoginForm): Promise<LoginResponse> => {
  return mockLogin(data)
}

export const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 300)
  })
}

export const getCurrentUser = (): Promise<{ data: unknown }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: '1',
          username: 'admin',
          name: '管理员',
          role: 'admin'
        }
      })
    }, 300)
  })
}