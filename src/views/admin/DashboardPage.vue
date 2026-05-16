<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getStatistics, getDailyStatistics } from '@/api/statistics'
import { User, CheckCircle, Clock, AlertCircle } from '@element-plus/icons-vue'

const statistics = ref<unknown>(null)
const dailyData = ref<unknown[]>([])

onMounted(async () => {
  statistics.value = await getStatistics()
  dailyData.value = (await getDailyStatistics()).data
})
</script>

<template>
  <div class="dashboard-page">
    <div class="dashboard-page__header">
      <h2>仪表盘</h2>
      <p>欢迎回来，管理员</p>
    </div>
    <div class="dashboard-page__stats">
      <el-card class="stat-card">
        <div class="stat-card__icon stat-card__icon--primary">
          <el-icon :size="32"><User /></el-icon>
        </div>
        <div class="stat-card__content">
          <div class="stat-card__value">128</div>
          <div class="stat-card__label">今日访客</div>
        </div>
      </el-card>
      <el-card class="stat-card">
        <div class="stat-card__icon stat-card__icon--success">
          <el-icon :size="32"><CheckCircle /></el-icon>
        </div>
        <div class="stat-card__content">
          <div class="stat-card__value">89</div>
          <div class="stat-card__label">已通过申请</div>
        </div>
      </el-card>
      <el-card class="stat-card">
        <div class="stat-card__icon stat-card__icon--warning">
          <el-icon :size="32"><Clock /></el-icon>
        </div>
        <div class="stat-card__content">
          <div class="stat-card__value">23</div>
          <div class="stat-card__label">待审核</div>
        </div>
      </el-card>
      <el-card class="stat-card">
        <div class="stat-card__icon stat-card__icon--danger">
          <el-icon :size="32"><AlertCircle /></el-icon>
        </div>
        <div class="stat-card__content">
          <div class="stat-card__value">5</div>
          <div class="stat-card__label">逾期未离开</div>
        </div>
      </el-card>
    </div>
    <div class="dashboard-page__charts">
      <el-card class="chart-card">
        <h3>每日来访统计</h3>
        <div class="chart-placeholder">
          <p>图表占位符</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.dashboard-page {
  padding: 20px;
}

.dashboard-page__header {
  margin-bottom: 20px;
}

.dashboard-page__header h2 {
  font-size: 24px;
  margin-bottom: 4px;
}

.dashboard-page__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
}

.stat-card__icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-card__icon--primary {
  background-color: #E8F4FD;
  color: #409EFF;
}

.stat-card__icon--success {
  background-color: #E8F8E8;
  color: #67C23A;
}

.stat-card__icon--warning {
  background-color: #FFF8E8;
  color: #E6A23C;
}

.stat-card__icon--danger {
  background-color: #FEE8E8;
  color: #F56C6C;
}

.stat-card__value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
}

.stat-card__label {
  font-size: 14px;
  color: #909399;
  margin-top: 4px;
}

.dashboard-page__charts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.chart-card {
  padding: 20px;
}

.chart-card h3 {
  font-size: 16px;
  margin-bottom: 16px;
}

.chart-placeholder {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F5F7FA;
  border-radius: 8px;
}

.chart-placeholder p {
  color: #909399;
}
</style>
