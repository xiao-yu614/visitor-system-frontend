import request from './request'
import type { LoginForm, LoginResponse } from '@/types/auth'

export const login = (data: LoginForm): Promise<LoginResponse> => {
  return request.post('/auth/login', data)
}

export const logout = (): Promise<void> => {
  return request.post('/auth/logout')
}

export const getCurrentUser = (): Promise<{ data: unknown }> => {
  return request.get('/auth/user')
}
