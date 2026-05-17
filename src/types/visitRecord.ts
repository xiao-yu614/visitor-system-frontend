export interface VisitRecord {
  id: string
  applyId: string
  visitorName: string
  phone: string
  idCard: string
  company?: string
  visitPerson: string
  reason: string
  startTime: string
  endTime: string
  checkInTime?: string
  checkOutTime?: string
  status: VisitRecordStatus
  createTime: string
}

export interface VisitRecordListParams {
  visitorName?: string
  phone?: string
  status?: VisitRecordStatus
  startDate?: string
  endDate?: string
  page?: number
  size?: number
}

export interface VisitRecordListResponse {
  list: VisitRecord[]
  total: number
}

export type VisitRecordStatus = 'checked-in' | 'checked-out' | 'completed' | 'overdue'

export const recordStatusMap: Record<VisitRecordStatus, { label: string; type: 'success' | 'warning' | 'info' | 'danger' }> = {
  'checked-in': { label: '在校', type: 'primary' },
  'checked-out': { label: '已离校', type: 'success' },
  'completed': { label: '已完成', type: 'info' },
  'overdue': { label: '已超时', type: 'danger' }
}
