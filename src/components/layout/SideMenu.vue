<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { HomeFilled, Document, Clock } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const menuItems = [
  { path: '/admin', name: '首页统计', icon: HomeFilled },
  { path: '/admin/apply-list', name: '访校申请管理', icon: File },
  { path: '/admin/visit-record', name: '访问记录管理', icon: Clock }
]

const activePath = computed(() => route.path)

const handleNav = (path: string) => {
  router.push(path)
}
</script>

<template>
  <el-aside width="220px" class="side-menu">
    <el-menu
      :default-active="activePath"
      class="side-menu-nav"
      background-color="#001529"
      text-color="rgba(255, 255, 255, 0.7)"
      active-text-color="#409eff"
    >
      <el-menu-item
        v-for="item in menuItems"
        :key="item.path"
        :index="item.path"
        @click="handleNav(item.path)"
      >
        <el-icon class="menu-icon">
          <component :is="item.icon" />
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style scoped>
.side-menu {
  background-color: #001529;
  height: 100%;
  overflow-y: auto;
}

.side-menu-nav {
  border-right: none;
}

.menu-icon {
  margin-right: 10px;
  font-size: 18px;
}
</style>
