export interface VisitRecord {
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

export type VisitRecordStatus = 'WAITING_CHECK_IN' | 'CHECKED_IN' | 'CHECKED_OUT' | 'COMPLETED' | 'OVERDUE'

export const recordStatusMap: Record<VisitRecordStatus, { label: string; type: 'success' | 'warning' | 'info' | 'danger' | 'primary' }> = {
  'WAITING_CHECK_IN': { label: '待入校', type: 'warning' },
  'CHECKED_IN': { label: '在校', type: 'primary' },
  'CHECKED_OUT': { label: '已离校', type: 'success' },
  'COMPLETED': { label: '已完成', type: 'info' },
  'OVERDUE': { label: '已超时', type: 'danger' }
}
