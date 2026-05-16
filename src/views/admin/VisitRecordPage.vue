<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getVisitRecordList, checkIn, checkOut } from '@/api/visitRecord'
import { formatDate, formatTime } from '@/utils/format'

const tableData = ref<unknown[]>([])
const total = ref(0)
const page = ref(1)
const size = ref(10)

onMounted(async () => {
  await loadData()
})

const loadData = async () => {
  const result = await getVisitRecordList({ page: page.value, size: size.value })
  tableData.value = result.data
  total.value = result.total
}

const handleCheckIn = async (id: string) => {
  await checkIn(id)
  await loadData()
}

const handleCheckOut = async (id: string) => {
  await checkOut(id)
  await loadData()
}

const handleSizeChange = (val: number) => {
  size.value = val
  loadData()
}

const handleCurrentChange = (val: number) => {
  page.value = val
  loadData()
}
</script>

<template>
  <div class="visit-record-page">
    <div class="visit-record-page__header">
      <h2>来访记录</h2>
    </div>
    <el-card class="visit-record-page__card">
      <el-table :data="tableData" border class="record-table">
        <el-table-column prop="id" label="记录编号" />
        <el-table-column prop="visitorName" label="访客姓名" />
        <el-table-column prop="visitorIdCard" label="身份证号" />
        <el-table-column prop="visitorPhone" label="联系电话" />
        <el-table-column prop="visitDate" label="来访日期">
          <template #default="scope">{{ formatDate(scope.row.visitDate) }}</template>
        </el-table-column>
        <el-table-column prop="visitTime" label="来访时间">
          <template #default="scope">{{ formatTime(scope.row.visitTime) }}</template>
        </el-table-column>
        <el-table-column prop="visitPlace" label="来访地点" />
        <el-table-column prop="hostName" label="接待人" />
        <el-table-column prop="checkInTime" label="签到时间">
          <template #default="scope">{{ scope.row.checkInTime ? formatTime(scope.row.checkInTime) : '-' }}</template>
        </el-table-column>
        <el-table-column prop="checkOutTime" label="签退时间">
          <template #default="scope">{{ scope.row.checkOutTime ? formatTime(scope.row.checkOutTime) : '-' }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <span :class="['status', `status--${scope.row.status}`]">
              {{ scope.row.status === 'checked-in' ? '在校' : scope.row.status === 'checked-out' ? '已离开' : '逾期' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              v-if="!scope.row.checkInTime"
              type="primary"
              size="small"
              @click="handleCheckIn(scope.row.id)"
            >
              签到
            </el-button>
            <el-button
              v-if="scope.row.checkInTime && !scope.row.checkOutTime"
              type="success"
              size="small"
              @click="handleCheckOut(scope.row.id)"
            >
              签退
            </el-button>
            <span v-else class="no-action">-</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page"
        :page-size="size"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="record-table__pagination"
      />
    </el-card>
  </div>
</template>

<style scoped>
.visit-record-page {
  padding: 20px;
}

.visit-record-page__header {
  margin-bottom: 20px;
}

.visit-record-page__header h2 {
  font-size: 24px;
}

.record-table {
  margin-bottom: 20px;
}

.status {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
}

.status--checked-in {
  background-color: #E8F4FD;
  color: #409EFF;
}

.status--checked-out {
  background-color: #E8F8E8;
  color: #67C23A;
}

.status--overdue {
  background-color: #FEE8E8;
  color: #F56C6C;
}

.no-action {
  color: #C0C4CC;
}

.record-table__pagination {
  text-align: right;
}
</style>
