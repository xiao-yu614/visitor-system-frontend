import request from './request'
import type { VisitApplyListParams, VisitApplyListResponse, ApprovalParams } from '@/types/visitApply'

export const getApplyList = (params?: VisitApplyListParams): Promise<VisitApplyListResponse> => {
  console.log('getApplyList request params:', params)
  return request.get('/admin/apply/list', { params })
}

export const approveApply = (id: string, data: ApprovalParams): Promise<any> => {
  console.log('approveApply request:', { id, data })
  return request.put(`/admin/apply/${id}/approve`, data)
}