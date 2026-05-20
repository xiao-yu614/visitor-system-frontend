<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { User, Check, Warning, Clock } from '@element-plus/icons-vue'
import { getStatistics } from '@/api/statistics'

const stats = ref([
  { label: '今日访客', value: 0, icon: User, color: '#409eff' },
  { label: '已通过申请', value: 0, icon: Check, color: '#67c23a' },
  { label: '待审核', value: 0, icon: Warning, color: '#e6a23c' },
  { label: '今日签到', value: 0, icon: Clock, color: '#f56c6c' }
])

const loading = ref(false)

const fetchStatistics = async () => {
  loading.value = true
  try {
    const result = await getStatistics()
    console.log('Statistics data:', result)
    stats.value = [
      { label: '今日访客', value: result.data.todayApplyCount || 0, icon: User, color: '#409eff' },
      { label: '已通过申请', value: result.data.pendingCount || 0, icon: Check, color: '#67c23a' },
      { label: '待审核', value: result.data.pendingCount || 0, icon: Warning, color: '#e6a23c' },
      { label: '今日签到', value: result.data.todayCheckInCount || 0, icon: Clock, color: '#f56c6c' }
    ]
  } catch (error) {
    console.error('Fetch statistics failed:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStatistics()
})
</script>

<template>
  <div class="dashboard">
    <div class="page-header">
      <h2>首页统计</h2>
      <p>欢迎使用外来人员访校管理系统</p>
    </div>

    <div class="stats-container">
      <div v-for="(stat, index) in stats" :key="index" class="stat-card">
        <div class="stat-icon" :style="{ backgroundColor: stat.color + '20' }">
          <el-icon :size="40" :color="stat.color">
            <component :is="stat.icon" />
          </el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <div class="charts-container">
      <el-card class="chart-card">
        <template #header>
          <div class="card-header">
            <span>今日访客趋势</span>
          </div>
        </template>
        <div class="chart-placeholder">
          <el-empty description="图表区域占位" />
        </div>
      </el-card>
      <el-card class="chart-card">
        <template #header>
          <div class="card-header">
            <span>申请类型统计</span>
          </div>
        </template>
        <div class="chart-placeholder">
          <el-empty description="图表区域占位" />
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 10px;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h2 {
  font-size: 24px;
  color: #303133;
  margin: 0 0 8px 0;
}

.page-header p {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 36px;
  font-weight: bold;
  color: #303133;
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.chart-card {
  height: 350px;
}

.card-header {
  font-weight: 600;
  color: #303133;
}

.chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 260px;
}
</style>
