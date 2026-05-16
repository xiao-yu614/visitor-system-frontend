<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getApprovalList, approveVisit, rejectVisit } from '@/api/approval'
import { formatDate, formatTime } from '@/utils/format'
import type { VisitStatus } from '@/types/visitApply'

const tableData = ref<unknown[]>([])
const total = ref(0)
const page = ref(1)
const size = ref(10)

onMounted(async () => {
  await loadData()
})

const loadData = async () => {
  const result = await getApprovalList({ page: page.value, size: size.value })
  tableData.value = result.data
  total.value = result.total
}

const handleApprove = async (id: string) => {
  await approveVisit(id)
  await loadData()
}

const handleReject = async (id: string) => {
  await rejectVisit(id, '拒绝')
  await loadData()
}

const getStatusLabel = (status: VisitStatus) => {
  const labels: Record<VisitStatus, string> = {
    pending: '待审核',
    approved: '已通过',
    rejected: '已拒绝',
    visited: '已到访',
    completed: '已完成'
  }
  return labels[status]
}

const getStatusClass = (status: VisitStatus) => {
  const classes: Record<VisitStatus, string> = {
    pending: 'status--pending',
    approved: 'status--approved',
    rejected: 'status--rejected',
    visited: 'status--visited',
    completed: 'status--completed'
  }
  return classes[status]
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
  <div class="apply-list-page">
    <div class="apply-list-page__header">
      <h2>申请列表</h2>
    </div>
    <el-card class="apply-list-page__card">
      <el-table :data="tableData" border class="apply-table">
        <el-table-column prop="id" label="申请编号" />
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
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <span :class="['status', getStatusClass(scope.row.status)]">
              {{ getStatusLabel(scope.row.status) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              v-if="scope.row.status === 'pending'"
              type="primary"
              size="small"
              @click="handleApprove(scope.row.id)"
            >
              通过
            </el-button>
            <el-button
              v-if="scope.row.status === 'pending'"
              type="danger"
              size="small"
              @click="handleReject(scope.row.id)"
            >
              拒绝
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
        class="apply-table__pagination"
      />
    </el-card>
  </div>
</template>

<style scoped>
.apply-list-page {
  padding: 20px;
}

.apply-list-page__header {
  margin-bottom: 20px;
}

.apply-list-page__header h2 {
  font-size: 24px;
}

.apply-table {
  margin-bottom: 20px;
}

.status {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
}

.status--pending {
  background-color: #FFF8E8;
  color: #E6A23C;
}

.status--approved {
  background-color: #E8F8E8;
  color: #67C23A;
}

.status--rejected {
  background-color: #FEE8E8;
  color: #F56C6C;
}

.status--visited {
  background-color: #E8F4FD;
  color: #409EFF;
}

.status--completed {
  background-color: #F5F7FA;
  color: #909399;
}

.no-action {
  color: #C0C4CC;
}

.apply-table__pagination {
  text-align: right;
}
</style>
