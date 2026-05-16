export interface LoginForm {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: UserInfo
}

export interface UserInfo {
  id: string
  username: string
  name: string
  role: string
  department?: string
}
