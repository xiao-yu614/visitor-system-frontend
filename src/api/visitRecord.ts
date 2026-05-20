import request from './request'
import type { VisitRecordListParams, VisitRecordListResponse } from '@/types/visitRecord'

export const getVisitRecordList = (params?: VisitRecordListParams): Promise<VisitRecordListResponse> => {
  console.log('getVisitRecordList request params:', params)
  return request.get('/admin/visit-record/list', { params })
}

export const checkIn = (id: string): Promise<any> => {
  console.log('checkIn request:', { id })
  return request.put(`/visit-record/${id}/check-in`)
}

export const checkOut = (id: string): Promise<any> => {
  console.log('checkOut request:', { id })
  return request.put(`/visit-record/${id}/check-out`)
}