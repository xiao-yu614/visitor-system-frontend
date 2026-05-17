<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import type { LoginForm } from '@/types/auth'

const router = useRouter()
const userStore = useUserStore()

const form = ref<LoginForm>({
  username: '',
  password: ''
})

const loading = ref(false)

const handleLogin = async () => {
  if (!form.value.username.trim()) {
    ElMessage.error('请输入用户名')
    return
  }
  if (!form.value.password.trim()) {
    ElMessage.error('请输入密码')
    return
  }

  loading.value = true
  try {
    const result = await userStore.login(form.value)
    if (result.token) {
      ElMessage.success('登录成功')
      await router.push('/admin')
    } else {
      ElMessage.error('登录失败，请检查用户名或密码')
    }
  } catch (error) {
    ElMessage.error('登录失败，请检查用户名或密码')
    console.error('Login failed:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-page__container">
      <div class="login-page__logo">
        <h1>外来人员访校系统</h1>
        <p>管理后台</p>
      </div>
      <el-card class="login-page__card">
        <h2>管理员登录</h2>
        <el-form
          ref="formRef"
          :model="form"
          label-width="80px"
          class="login-form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名"
              clearable
              @keyup.enter="handleLogin"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              clearable
              @keyup.enter="handleLogin"
            />
          </el-form-item>
          <el-form-item class="login-form__submit">
            <el-button
              type="primary"
              @click="handleLogin"
              :loading="loading"
              style="width: 100%"
            >
              登录
            </el-button>
          </el-form-item>
          <el-form-item class="login-form__tips">
            <span class="tips">测试账号：admin / 123456</span>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-page__container {
  text-align: center;
  padding: 40px;
}

.login-page__logo h1 {
  font-size: 28px;
  color: #fff;
  margin-bottom: 8px;
}

.login-page__logo p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.login-page__card {
  width: 420px;
  margin-top: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  padding: 30px;
}

.login-page__card h2 {
  font-size: 22px;
  margin-bottom: 24px;
  color: #303133;
}

.login-form {
  padding: 0;
}

.login-form__submit {
  margin-top: 24px;
}

.login-form__tips {
  margin-top: 16px;
  margin-bottom: 0;
}

.tips {
  font-size: 12px;
  color: #909399;
}
</style>
