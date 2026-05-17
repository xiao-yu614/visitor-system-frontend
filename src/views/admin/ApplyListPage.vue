<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import { getApplyList, approveApply } from '@/api/approval'
import { statusMap } from '@/types/visitApply'
import type { VisitApplyItem, VisitApplyListParams, VisitStatus } from '@/types/visitApply'

const loading = ref(false)
const tableData = ref<VisitApplyItem[]>([])
const total = ref(0)

const searchParams = reactive<VisitApplyListParams>({
  status: undefined,
  visitorName: '',
  phone: '',
  page: 1,
  size: 10
})

const approvalDialogVisible = ref(false)
const approvalLoading = ref(false)
const currentApprovalId = ref('')
const currentApprovalType = ref<'approve' | 'reject'>('approve')
const approvalRemark = ref('')

const fetchData = async () => {
  loading.value = true
  try {
    const result = await getApplyList(searchParams)
    tableData.value = result.list
    total.value = result.total
  } catch (error) {
    ElMessage.error('获取申请列表失败')
    console.error('Fetch apply list failed:', error)
  } finally {
    loading.value = false
  }
}

const handleRefresh = () => {
  searchParams.page = 1
  fetchData()
}

const handleSearch = () => {
  searchParams.page = 1
  fetchData()
}

const handleReset = () => {
  searchParams.status = undefined
  searchParams.visitorName = ''
  searchParams.phone = ''
  searchParams.page = 1
  fetchData()
}

const handlePageChange = (page: number) => {
  searchParams.page = page
  fetchData()
}

const handleSizeChange = (size: number) => {
  searchParams.size = size
  searchParams.page = 1
  fetchData()
}

const handleApprove = (row: VisitApplyItem) => {
  currentApprovalId.value = row.id
  currentApprovalType.value = 'approve'
  approvalRemark.value = ''
  approvalDialogVisible.value = true
}

const handleReject = (row: VisitApplyItem) => {
  currentApprovalId.value = row.id
  currentApprovalType.value = 'reject'
  approvalRemark.value = ''
  approvalDialogVisible.value = true
}

const confirmApproval = async () => {
  if (currentApprovalType.value === 'reject' && !approvalRemark.value.trim()) {
    ElMessage.warning('请输入拒绝原因')
    return
  }

  try {
    await ElMessageBox.confirm(
      currentApprovalType.value === 'approve' ? '确定通过该申请吗？' : '确定拒绝该申请吗？',
      '确认审批',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: currentApprovalType.value === 'approve' ? 'success' : 'warning'
      }
    )

    approvalLoading.value = true
    await approveApply(currentApprovalId.value, {
      approved: currentApprovalType.value === 'approve',
      remark: approvalRemark.value || undefined
    })

    ElMessage.success(currentApprovalType.value === 'approve' ? '已通过申请' : '已拒绝申请')
    approvalDialogVisible.value = false
    fetchData()
  } catch (error: any) {
    if (error !== 'cancel') {
      ElMessage.error('审批操作失败')
      console.error('Approval failed:', error)
    }
  } finally {
    approvalLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="apply-list">
    <div class="page-header">
      <h2>访校申请管理</h2>
      <p>查看和管理外来人员的访校申请</p>
    </div>

    <el-card class="table-card">
      <template #header>
        <div class="card-header">
          <div class="search-bar">
            <el-select
              v-model="searchParams.status"
              placeholder="申请状态"
              clearable
              style="width: 150px"
            >
              <el-option label="全部" :value="undefined" />
              <el-option
                v-for="(item, key) in statusMap"
                :key="key"
                :label="item.label"
                :value="key as VisitStatus"
              />
            </el-select>

            <el-input
              v-model="searchParams.visitorName"
              placeholder="访客姓名"
              clearable
              style="width: 180px"
            />

            <el-input
              v-model="searchParams.phone"
              placeholder="手机号"
              clearable
              style="width: 180px"
            />

            <el-button type="primary" @click="handleSearch">
              搜索
            </el-button>

            <el-button @click="handleReset">
              重置
            </el-button>

            <el-button @click="handleRefresh">
              <el-icon><Refresh /></el-icon>
              刷新
            </el-button>
          </div>
        </div>
      </template>

      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        border
        stripe
      >
        <el-table-column prop="applyId" label="申请编号" width="160" />
        <el-table-column prop="visitorName" label="访客姓名" width="120" />
        <el-table-column prop="phone" label="手机号" width="140" />
        <el-table-column prop="idCard" label="身份证号" width="180" />
        <el-table-column prop="company" label="所属单位" show-overflow-tooltip min-width="150" />
        <el-table-column prop="visitPerson" label="访问对象" width="120" />
        <el-table-column prop="reason" label="访问事由" show-overflow-tooltip min-width="150" />
        <el-table-column label="访问时间" width="300">
          <template #default="scope">
            <div>{{ scope.row.startTime }}</div>
            <div style="color: #909399; font-size: 12px;">至 {{ scope.row.endTime }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="statusMap[scope.row.status].type">
              {{ statusMap[scope.row.status].label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="scope">
            <template v-if="scope.row.status === 'pending'">
              <el-button
                type="success"
                size="small"
                @click="handleApprove(scope.row)"
              >
                通过
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="handleReject(scope.row)"
              >
                拒绝
              </el-button>
            </template>
            <template v-else>
              <el-button
                type="info"
                size="small"
                disabled
              >
                已处理
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="searchParams.page"
        v-model:page-size="searchParams.size"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
        style="margin-top: 20px; text-align: right"
      />
    </el-card>

    <el-dialog
      v-model="approvalDialogVisible"
      :title="currentApprovalType === 'approve' ? '通过申请' : '拒绝申请'"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form label-width="100px">
        <el-form-item label="审批备注">
          <el-input
            v-model="approvalRemark"
            type="textarea"
            :rows="4"
            :placeholder="currentApprovalType === 'approve' ? '请输入通过备注（选填）' : '请输入拒绝原因（必填）'"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="approvalDialogVisible = false">取消</el-button>
        <el-button
          :type="currentApprovalType === 'approve' ? 'success' : 'danger'"
          :loading="approvalLoading"
          @click="confirmApproval"
        >
          确认
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.apply-list {
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

.search-bar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
