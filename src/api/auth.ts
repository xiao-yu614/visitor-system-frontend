import request from './request'
import type { LoginForm, LoginResponse } from '@/types/auth'

export const login = (data: LoginForm): Promise<LoginResponse> => {
  console.log('login request:', data)
  return request.post('/auth/login', data)
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