export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

export interface PageResponse<T = unknown> {
  data: T[]
  total: number
  page: number
  size: number
}
