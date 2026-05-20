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

export interface VisitApplyItem {
  id: string
  applyNo: string
  visitorName: string
  phone: string
  idCard: string
  company?: string
  visitPerson: string
  reason: string
  startTime: string
  endTime: string
  status: VisitStatus
  createTime: string
  updateTime?: string
  approvalComment?: string
}

export interface VisitApplyListParams {
  status?: VisitStatus
  visitorName?: string
  phone?: string
  page?: number
  size?: number
}

export interface VisitApplyListResponse {
  list: VisitApplyItem[]
  total: number
}

export interface VisitApplyDetail extends VisitApplyForm {
  id: string
  applyId: string
  status: VisitStatus
  createTime: string
  updateTime?: string
  approvalComment?: string
}

export interface ApprovalParams {
  approved: boolean
  remark?: string
}

export type VisitStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'VISITED' | 'COMPLETED'

export const statusMap: Record<VisitStatus, { label: string; type: 'success' | 'warning' | 'danger' | 'info' }> = {
  PENDING: { label: '待审批', type: 'warning' },
  APPROVED: { label: '已通过', type: 'success' },
  REJECTED: { label: '已拒绝', type: 'danger' },
  VISITED: { label: '已访问', type: 'info' },
  COMPLETED: { label: '已完成', type: 'info' }
}
