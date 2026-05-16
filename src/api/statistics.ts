import request from './request'

export const getStatistics = (params?: {
  startTime?: string
  endTime?: string
}): Promise<{ data: unknown }> => {
  return request.get('/statistics', { params })
}

export const getDailyStatistics = (): Promise<{ data: unknown[] }> => {
  return request.get('/statistics/daily')
}

export const getVisitorStatistics = (): Promise<{ data: unknown }> => {
  return request.get('/statistics/visitor')
}
