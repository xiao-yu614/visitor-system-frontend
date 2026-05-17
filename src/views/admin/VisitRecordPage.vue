<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

const tableData = ref([
  { id: 1, name: '张三', idCard: '310***********1234', phone: '138****1234', company: '某某科技有限公司', visitDate: '2026-05-18', checkIn: '09:12', checkOut: '12:30', hostName: '李四', hostDept: '教务处', status: 'completed' },
  { id: 2, name: '王五', idCard: '310***********5678', phone: '139****5678', company: '某某大学', visitDate: '2026-05-17', checkIn: '10:20', checkOut: '-', hostName: '赵六', hostDept: '科研处', status: 'checkedIn' },
  { id: 3, name: '钱七', idCard: '310***********9012', phone: '137****9012', company: '某某企业', visitDate: '2026-05-16', checkIn: '14:05', checkOut: '17:20', hostName: '孙八', hostDept: '后勤处', status: 'completed' },
  { id: 4, name: '周九', idCard: '310***********3456', phone: '136****3456', company: '某某集团', visitDate: '2026-05-15', checkIn: '16:40', checkOut: '18:10', hostName: '吴十', hostDept: '教务处', status: 'completed' }
])

const handleCheckIn = (row: any) => {
  row.checkIn = '09:15'
  row.status = 'checkedIn'
  ElMessage.success('已签到')
}

const handleCheckOut = (row: any) => {
  row.checkOut = '17:30'
  row.status = 'completed'
  ElMessage.success('已签退')
}

const getStatusTag = (status: string) => {
  const map: any = {
    checkedIn: { type: 'primary', text: '在校' },
    completed: { type: 'success', text: '已离开' }
  }
  return map[status] || { type: 'info', text: '未知' }
}
</script>

<template>
  <div class="visit-record">
    <div class="page-header">
      <h2>访问记录管理</h2>
      <p>查看和管理外来人员的访问记录</p>
    </div>

    <el-card class="table-card">
      <template #header>
        <div class="card-header">
          <div class="header-left">
            <el-input v-model="''" placeholder="搜索访客姓名" prefix-icon="Search" style="width: 200px" clearable />
            <el-date-picker v-model="''" type="date" placeholder="选择日期" style="width: 180px; margin-left: 12px" />
            <el-select v-model="''" placeholder="状态" clearable style="width: 120px; margin-left: 12px">
              <el-option label="全部" value="" />
              <el-option label="在校" value="checkedIn" />
              <el-option label="已离开" value="completed" />
            </el-select>
          </div>
        </div>
      </template>

      <el-table :data="tableData" style="width: 100%" border stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="访客姓名" width="120" />
        <el-table-column prop="idCard" label="身份证号" width="180" />
        <el-table-column prop="phone" label="联系电话" width="140" />
        <el-table-column prop="company" label="所在单位" show-overflow-tooltip />
        <el-table-column prop="visitDate" label="访校日期" width="120" />
        <el-table-column prop="checkIn" label="签到时间" width="120" />
        <el-table-column prop="checkOut" label="签退时间" width="120" />
        <el-table-column prop="hostName" label="接待人" width="100" />
        <el-table-column prop="hostDept" label="接待部门" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="getStatusTag(scope.row.status).type">
              {{ getStatusTag(scope.row.status).text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <template v-if="!scope.row.checkIn">
              <el-button type="primary" size="small" @click="handleCheckIn(scope.row)">签到</el-button>
            </template>
            <template v-else-if="!scope.row.checkOut || scope.row.checkOut === '-'">
              <el-button type="success" size="small" @click="handleCheckOut(scope.row)">签退</el-button>
            </template>
            <template v-else>
              <el-button type="primary" size="small">查看</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :total="tableData.length"
        :page-size="10"
        layout="total, prev, pager, next"
        style="margin-top: 20px; text-align: right"
      />
    </el-card>
  </div>
</template>

<style scoped>
.visit-record {
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

.table-card {
  border-radius: 8px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
