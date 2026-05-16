export interface VisitRecord {
  id: string
  applyId: string
  visitorName: string
  visitorIdCard: string
  visitorPhone: string
  visitDate: string
  visitTime: string
  leaveTime?: string
  checkInTime?: string
  checkOutTime?: string
  visitPlace: string
  hostName: string
  status: VisitRecordStatus
}

export type VisitRecordStatus = 'checked-in' | 'checked-out' | 'overdue'
