import request from './request'
import type { VisitApplyForm, VisitApplyDetail } from '@/types/visitApply'

export const createVisitApply = (data: VisitApplyForm): Promise<{ data: VisitApplyDetail }> => {
  return request.post('/visit-apply', data)
}

export const getVisitApplyById = (id: string): Promise<{ data: VisitApplyDetail }> => {
  return request.get(`/visit-apply/${id}`)
}

export const updateVisitApply = (id: string, data: Partial<VisitApplyForm>): Promise<{ data: VisitApplyDetail }> => {
  return request.put(`/visit-apply/${id}`, data)
}

export const deleteVisitApply = (id: string): Promise<void> => {
  return request.delete(`/visit-apply/${id}`)
}
