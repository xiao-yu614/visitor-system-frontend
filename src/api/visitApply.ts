import request from './request'
import type { VisitApplyForm, VisitApplyResponse } from '@/types/visitApply'

export const createVisitApply = (data: VisitApplyForm): Promise<VisitApplyResponse> => {
  console.log('createVisitApply request:', data)
  return request.post('/visit/apply', data)
}