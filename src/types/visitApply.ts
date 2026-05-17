export interface VisitApplyForm {
  visitorName: string
  phone: string
  idCard: string
  company?: string
  visitPerson: string
  reason: string
  startTime: string
  endTime: string
}

export interface VisitApplyResponse {
  applyId: string
  message?: string
}

export interface VisitApplyDetail extends VisitApplyForm {
  id: string
  applyId: string
  status: VisitStatus
  createTime: string
  updateTime?: string
  approvalComment?: string
}

export type VisitStatus = 'pending' | 'approved' | 'rejected' | 'visited' | 'completed'
