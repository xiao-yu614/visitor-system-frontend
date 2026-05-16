export interface VisitApplyForm {
  visitorName: string
  visitorIdCard: string
  visitorPhone: string
  visitorCompany?: string
  visitDate: string
  visitTime: string
  leaveTime: string
  visitReason: string
  visitPlace: string
  hostName: string
  hostPhone: string
  hostDepartment: string
}

export interface VisitApplyDetail extends VisitApplyForm {
  id: string
  status: VisitStatus
  createTime: string
  updateTime?: string
  approvalComment?: string
}

export type VisitStatus = 'pending' | 'approved' | 'rejected' | 'visited' | 'completed'
