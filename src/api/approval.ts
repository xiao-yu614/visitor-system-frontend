import request from './request'

export const approveVisit = (id: string, comment?: string): Promise<void> => {
  return request.post(`/approval/${id}/approve`, { comment })
}

export const rejectVisit = (id: string, comment: string): Promise<void> => {
  return request.post(`/approval/${id}/reject`, { comment })
}

export const getApprovalList = (params?: { page?: number; size?: number }): Promise<{ data: unknown[]; total: number }> => {
  return request.get('/approval/list', { params })
}
