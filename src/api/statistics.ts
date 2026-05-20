import request from './request'
import type { StatisticsData } from '@/types/api'

export const getStatistics = (): Promise<{ data: StatisticsData }> => {
  console.log('getStatistics request')
  return request.get('/admin/statistics')
}