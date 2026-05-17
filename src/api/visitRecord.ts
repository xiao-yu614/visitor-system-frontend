import request from './request'
import type { VisitRecordListParams, VisitRecordListResponse } from '@/types/visitRecord'

const mockVisitRecordList: any[] = [
  {
    id: '1',
    applyId: 'AP20260517002',
    visitorName: '王五',
    phone: '13900139000',
    idCard: '110101198505155678',
    company: '上海贸易公司',
    visitPerson: '赵六',
    reason: '商务洽谈',
    startTime: '2026-05-17 14:00:00',
    endTime: '2026-05-17 16:00:00',
    checkInTime: '2026-05-17 13:55:00',
    checkOutTime: null,
    status: 'CHECKED_IN',
    createTime: '2026-05-16 16:00:00'
  },
  {
    id: '2',
    applyId: 'AP20260517004',
    visitorName: '吴九',
    phone: '13600136000',
    idCard: '110101198812123456',
    company: '深圳科技集团',
    visitPerson: '郑十',
    reason: '参观学习',
    startTime: '2026-05-17 09:00:00',
    endTime: '2026-05-17 17:00:00',
    checkInTime: '2026-05-17 08:55:00',
    checkOutTime: '2026-05-17 16:30:00',
    status: 'CHECKED_OUT',
    createTime: '2026-05-15 14:00:00'
  },
  {
    id: '3',
    applyId: 'AP20260517001',
    visitorName: '张三',
    phone: '13800138000',
    idCard: '110101199001011234',
    company: '北京科技有限公司',
    visitPerson: '李四',
    reason: '技术交流',
    startTime: '2026-05-18 10:00:00',
    endTime: '2026-05-18 12:00:00',
    checkInTime: null,
    checkOutTime: null,
    status: 'WAITING_CHECK_IN',
    createTime: '2026-05-17 09:30:00'
  },
  {
    id: '4',
    applyId: 'AP20260517005',
    visitorName: '陈十一',
    phone: '13500135000',
    idCard: '110101199503037890',
    company: '杭州互联网公司',
    visitPerson: '刘十二',
    reason: '技术分享',
    startTime: '2026-05-16 10:00:00',
    endTime: '2026-05-16 12:00:00',
    checkInTime: '2026-05-16 09:55:00',
    checkOutTime: '2026-05-16 12:05:00',
    status: 'COMPLETED',
    createTime: '2026-05-14 16:00:00'
  },
  {
    id: '5',
    applyId: 'AP20260516001',
    visitorName: '周十三',
    phone: '18800188000',
    idCard: '110101199107075678',
    company: '成都科技公司',
    visitPerson: '吴十四',
    reason: '项目评审',
    startTime: '2026-05-15 09:00:00',
    endTime: '2026-05-15 11:00:00',
    checkInTime: null,
    checkOutTime: null,
    status: 'OVERDUE',
    createTime: '2026-05-14 10:00:00'
  }
]

const mockGetVisitRecordList = (params?: VisitRecordListParams): Promise<VisitRecordListResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredList = [...mockVisitRecordList]
      
      if (params?.status) {
        filteredList = filteredList.filter(item => item.status === params.status)
      }
      if (params?.visitorName) {
        filteredList = filteredList.filter(item => item.visitorName.includes(params.visitorName))
      }
      if (params?.phone) {
        filteredList = filteredList.filter(item => item.phone.includes(params.phone))
      }
      
      const page = params?.page || 1
      const size = params?.size || 10
      const start = (page - 1) * size
      const end = start + size
      
      resolve({
        code: 200,
        message: 'success',
        data: {
          list: filteredList.slice(start, end),
          total: filteredList.length
        }
      })
    }, 300)
  })
}

const mockCheckIn = (id: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: '入校登记成功'
      })
    }, 300)
  })
}

const mockCheckOut = (id: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: '离校登记成功'
      })
    }, 300)
  })
}

export const getVisitRecordList = (params?: VisitRecordListParams): Promise<VisitRecordListResponse> => {
  return mockGetVisitRecordList(params)
}

export const checkIn = (id: string): Promise<any> => {
  return mockCheckIn(id)
}

export const checkOut = (id: string): Promise<any> => {
  return mockCheckOut(id)
}