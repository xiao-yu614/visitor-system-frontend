<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { LayoutDashboard, FileText, ClipboardList } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const menuItems = [
  { path: '/admin', label: '仪表盘', icon: LayoutDashboard },
  { path: '/admin/apply-list', label: '申请列表', icon: FileText },
  { path: '/admin/visit-record', label: '来访记录', icon: ClipboardList }
]

const isActive = (path: string) => {
  return route.path === path
}

const handleNav = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="side-menu">
    <el-menu mode="vertical" :default-active="route.path" class="side-menu__menu">
      <el-menu-item
        v-for="item in menuItems"
        :key="item.path"
        :index="item.path"
        :class="{ 'is-active': isActive(item.path) }"
        @click="handleNav(item.path)"
      >
        <el-icon :size="20"><component :is="item.icon" /></el-icon>
        <span>{{ item.label }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.side-menu {
  height: 100%;
  padding-top: 20px;
}

.side-menu__menu {
  border-right: none;
}
</style>
