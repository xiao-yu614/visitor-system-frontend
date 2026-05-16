<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { LogOut, User } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const handleLogout = async () => {
  await userStore.logout()
  await router.push('/login')
}
</script>

<template>
  <div class="header-bar">
    <div class="header-title">外来人员访校系统</div>
    <div class="header-right">
      <el-dropdown>
        <span class="user-info">
          <el-icon :size="20" class="user-icon"><User /></el-icon>
          <span>管理员</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLogout">
              <el-icon :size="16"><LogOut /></el-icon>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
}

.header-title {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  cursor: pointer;
}

.user-icon {
  margin-right: 4px;
}
</style>
