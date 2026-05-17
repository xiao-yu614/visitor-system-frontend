import request from './request'
import type { VisitApplyForm, VisitApplyResponse } from '@/types/visitApply'

const mockCreateVisitApply = (data: VisitApplyForm): Promise<VisitApplyResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const applyId = 'AP' + Date.now().toString().slice(-8)
      resolve({
        code: 200,
        message: '申请提交成功',
        data: {
          applyId
        }
      })
    }, 500)
  })
}

export const createVisitApply = (data: VisitApplyForm): Promise<VisitApplyResponse> => {
  return mockCreateVisitApply(data)
}