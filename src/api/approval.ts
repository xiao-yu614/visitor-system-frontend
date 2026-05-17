import request from './request'
import type { VisitApplyListParams, VisitApplyListResponse, ApprovalParams } from '@/types/visitApply'

export const getApplyList = (params?: VisitApplyListParams): Promise<VisitApplyListResponse> => {
  return request.get('/admin/apply/list', { params })
}

export const approveApply = (id: string, data: ApprovalParams): Promise<void> => {
  return request.put(`/admin/apply/${id}/approve`, data)
}

export const approveVisit = (id: string, comment?: string): Promise<void> => {
  return request.post(`/approval/${id}/approve`, { comment })
}

export const rejectVisit = (id: string, comment: string): Promise<void> => {
  return request.post(`/approval/${id}/reject`, { comment })
}
