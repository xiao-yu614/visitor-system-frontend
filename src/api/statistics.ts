import request from './request'
import type { StatisticsData } from '@/types/api'

const mockGetStatistics = (): Promise<{ data: StatisticsData }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: 'success',
        data: {
          todayApplyCount: 15,
          pendingCount: 5,
          todayCheckInCount: 12,
          currentInSchoolCount: 8,
          todayCheckOutCount: 4
        }
      })
    }, 300)
  })
}

export const getStatistics = (): Promise<{ data: StatisticsData }> => {
  return mockGetStatistics()
}