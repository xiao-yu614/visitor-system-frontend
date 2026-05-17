import type { VisitApplyForm, VisitApplyResponse } from '@/types/visitApply'

const mockCreateVisitApply = (data: VisitApplyForm): Promise<VisitApplyResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const applyId = 'AP' + Date.now().toString().slice(-8)
      resolve({
        applyId,
        message: '申请提交成功'
      })
    }, 500)
  })
}

export const createVisitApply = (data: VisitApplyForm): Promise<VisitApplyResponse> => {
  return mockCreateVisitApply(data)
}