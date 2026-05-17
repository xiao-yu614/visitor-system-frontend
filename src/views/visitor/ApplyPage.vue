<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { createVisitApply } from '@/api/visitApply'
import type { VisitApplyForm } from '@/types/visitApply'
import type { FormInstance, FormRules } from 'element-plus'

const formRef = ref<FormInstance>()

const form = reactive<VisitApplyForm>({
  visitorName: '',
  phone: '',
  idCard: '',
  company: '',
  visitPerson: '',
  reason: '',
  startTime: '',
  endTime: ''
})

const loading = ref(false)
const showSuccessDialog = ref(false)
const applyId = ref('')

const validateEndTime = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('请输入结束时间'))
  } else if (form.startTime && new Date(value) <= new Date(form.startTime)) {
    callback(new Error('结束时间必须晚于开始时间'))
  } else {
    callback()
  }
}

const rules: FormRules = {
  visitorName: [
    { required: true, message: '请输入访客姓名', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  idCard: [
    { required: true, message: '请输入身份证号', trigger: 'blur' }
  ],
  visitPerson: [
    { required: true, message: '请输入访问对象', trigger: 'blur' }
  ],
  reason: [
    { required: true, message: '请输入访问事由', trigger: 'blur' }
  ],
  startTime: [
    { required: true, message: '请选择开始时间', trigger: 'change' }
  ],
  endTime: [
    { required: true, validator: validateEndTime, trigger: 'change' }
  ]
}

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const result = await createVisitApply(form)
        applyId.value = result.applyId
        showSuccessDialog.value = true
      } catch (error) {
        ElMessage.error('申请提交失败，请稍后重试')
        console.error('Submit apply failed:', error)
      } finally {
        loading.value = false
      }
    }
  })
}

const resetForm = () => {
  formRef.value?.resetFields()
  showSuccessDialog.value = false
  applyId.value = ''
}
</script>

<template>
  <div class="apply-page">
    <div class="apply-page__header">
      <h2>外来人员访校申请</h2>
      <p>请填写以下信息完成访校申请</p>
    </div>

    <el-card class="apply-page__card">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="120px"
        class="apply-form"
      >
        <el-form-item label="访客姓名" prop="visitorName">
          <el-input v-model="form.visitorName" placeholder="请输入访客姓名" />
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" maxlength="11" />
        </el-form-item>

        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="form.idCard" placeholder="请输入身份证号" />
        </el-form-item>

        <el-form-item label="所属单位" prop="company">
          <el-input v-model="form.company" placeholder="请输入所属单位" />
        </el-form-item>

        <el-form-item label="访问对象" prop="visitPerson">
          <el-input v-model="form.visitPerson" placeholder="请输入访问对象" />
        </el-form-item>

        <el-form-item label="访问事由" prop="reason">
          <el-input
            v-model="form.reason"
            type="textarea"
            placeholder="请输入访问事由"
            :rows="3"
          />
        </el-form-item>

        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            placeholder="选择开始时间"
            style="width: 100%"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            placeholder="选择结束时间"
            style="width: 100%"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item class="apply-form__submit">
          <el-button type="primary" @click="handleSubmit" :loading="loading" style="width: 200px">
            提交申请
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-dialog
      v-model="showSuccessDialog"
      title="申请提交成功"
      width="450px"
      :close-on-click-modal="false"
    >
      <div class="success-content">
        <el-icon class="success-icon" color="#67c23a" :size="80">
          <circle-check />
        </el-icon>
        <p class="success-text">您的申请已提交，申请编号：</p>
        <p class="apply-id">{{ applyId }}</p>
        <p class="tip">请记住您的申请编号，用于查询申请状态</p>
      </div>
      <template #footer>
        <el-button type="primary" @click="resetForm">
          继续申请
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.apply-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 20px;
}

.apply-page__header {
  text-align: center;
  margin-bottom: 30px;
}

.apply-page__header h2 {
  font-size: 26px;
  color: #303133;
  margin-bottom: 10px;
}

.apply-page__header p {
  font-size: 14px;
  color: #909399;
}

.apply-page__card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.apply-form {
  padding: 20px;
}

.apply-form__submit {
  text-align: center;
  margin-top: 30px;
}

.success-content {
  text-align: center;
  padding: 20px;
}

.success-icon {
  margin-bottom: 20px;
}

.success-text {
  font-size: 16px;
  color: #303133;
  margin-bottom: 16px;
}

.apply-id {
  font-size: 24px;
  font-weight: bold;
  color: #409eff;
  margin-bottom: 16px;
}

.tip {
  font-size: 13px;
  color: #909399;
}
</style>
