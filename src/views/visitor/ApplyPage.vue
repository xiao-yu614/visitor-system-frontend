<script setup lang="ts">
import type { VisitApplyForm } from '@/types/visitApply'

const form = ref<VisitApplyForm>({
  visitorName: '',
  visitorIdCard: '',
  visitorPhone: '',
  visitorCompany: '',
  visitDate: '',
  visitTime: '',
  leaveTime: '',
  visitReason: '',
  visitPlace: '',
  hostName: '',
  hostPhone: '',
  hostDepartment: ''
})

const handleSubmit = () => {
}
</script>

<template>
  <div class="apply-page">
    <div class="apply-page__header">
      <h2>访客申请</h2>
      <p>请填写以下信息完成访校申请</p>
    </div>
    <el-card class="apply-page__card">
      <el-form ref="formRef" :model="form" label-width="120px" class="apply-form">
        <el-form-item label="访客姓名" prop="visitorName" required>
          <el-input v-model="form.visitorName" placeholder="请输入访客姓名" />
        </el-form-item>
        <el-form-item label="身份证号" prop="visitorIdCard" required>
          <el-input v-model="form.visitorIdCard" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="联系电话" prop="visitorPhone" required>
          <el-input v-model="form.visitorPhone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="所在单位">
          <el-input v-model="form.visitorCompany" placeholder="请输入所在单位" />
        </el-form-item>
        <el-form-item label="来访日期" prop="visitDate" required>
          <el-date-picker v-model="form.visitDate" type="date" placeholder="选择来访日期" />
        </el-form-item>
        <el-form-item label="来访时间" prop="visitTime" required>
          <el-time-picker v-model="form.visitTime" placeholder="选择来访时间" />
        </el-form-item>
        <el-form-item label="离开时间" prop="leaveTime" required>
          <el-time-picker v-model="form.leaveTime" placeholder="选择离开时间" />
        </el-form-item>
        <el-form-item label="来访事由" prop="visitReason" required>
          <el-input
            v-model="form.visitReason"
            type="textarea"
            placeholder="请输入来访事由"
            :rows="3"
          />
        </el-form-item>
        <el-form-item label="来访地点" prop="visitPlace" required>
          <el-input v-model="form.visitPlace" placeholder="请输入来访地点" />
        </el-form-item>
        <el-form-item label="接待人姓名" prop="hostName" required>
          <el-input v-model="form.hostName" placeholder="请输入接待人姓名" />
        </el-form-item>
        <el-form-item label="接待人电话" prop="hostPhone" required>
          <el-input v-model="form.hostPhone" placeholder="请输入接待人电话" />
        </el-form-item>
        <el-form-item label="接待部门" prop="hostDepartment" required>
          <el-input v-model="form.hostDepartment" placeholder="请输入接待部门" />
        </el-form-item>
        <el-form-item class="apply-form__submit">
          <el-button type="primary" @click="handleSubmit">提交申请</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.apply-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.apply-page__header {
  text-align: center;
  margin-bottom: 30px;
}

.apply-page__header h2 {
  font-size: 24px;
  margin-bottom: 8px;
}

.apply-page__card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.apply-form {
  padding: 20px;
}

.apply-form__submit {
  text-align: center;
  margin-top: 20px;
}
</style>
