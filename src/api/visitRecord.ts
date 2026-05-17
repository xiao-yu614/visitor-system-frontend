import request from './request'
import type { VisitRecordListParams, VisitRecordListResponse } from '@/types/visitRecord'

export const getVisitRecordList = (params?: VisitRecordListParams): Promise<VisitRecordListResponse> => {
  return request.get('/admin/visit-record/list', { params })
}

export const getVisitRecordById = (id: string): Promise<VisitRecordListResponse> => {
  return request.get(`/visit-record/${id}`)
}

export const checkIn = (id: string): Promise<void> => {
  return request.put(`/visit-record/${id}/check-in`)
}

export const checkOut = (id: string): Promise<void> => {
  return request.put(`/visit-record/${id}/check-out`)
}
