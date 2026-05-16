import request from './request'

export const getVisitRecordList = (params?: {
  page?: number
  size?: number
  visitorName?: string
  startTime?: string
  endTime?: string
}): Promise<{ data: unknown[]; total: number }> => {
  return request.get('/visit-record/list', { params })
}

export const getVisitRecordById = (id: string): Promise<{ data: unknown }> => {
  return request.get(`/visit-record/${id}`)
}

export const checkIn = (id: string): Promise<void> => {
  return request.post(`/visit-record/${id}/check-in`)
}

export const checkOut = (id: string): Promise<void> => {
  return request.post(`/visit-record/${id}/check-out`)
}
