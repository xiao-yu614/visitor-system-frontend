import request from './request'
import type { VisitApplyListParams, VisitApplyListResponse } from '@/types/visitApply'

export const approveVisit = (id: string, comment?: string): Promise<void> => {
  return request.post(`/approval/${id}/approve`, { comment })
}

export const rejectVisit = (id: string, comment: string): Promise<void> => {
  return request.post(`/approval/${id}/reject`, { comment })
}

export const getApplyList = (params?: VisitApplyListParams): Promise<VisitApplyListResponse> => {
  return request.get('/admin/apply/list', { params })
}
