<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()

const handleLogout = () => {
  ElMessage.success('已退出登录')
  router.push('/login')
}
</script>

<template>
  <el-header class="header-bar">
    <div class="header-left">
      <h1 class="app-title">外来人员访校系统</h1>
    </div>
    <div class="header-right">
      <el-dropdown>
        <span class="user-info">
          <el-icon :size="20" class="user-icon"><User /></el-icon>
          <span>管理员</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLogout">
              <el-icon><Lock /></el-icon>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<style scoped>
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  height: 60px;
}

.app-title {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
  letter-spacing: 2px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
}

.user-info:hover {
  background: rgba(255, 255, 255, 0.25);
}

.user-icon {
  font-size: 20px;
}
</style>
