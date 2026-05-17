<script setup lang="ts">
import HeaderBar from './HeaderBar.vue'
import SideMenu from './SideMenu.vue'
</script>

<template>
  <el-container class="admin-layout">
    <el-header class="admin-header">
      <HeaderBar />
    </el-header>
    <el-container class="admin-body">
      <el-aside class="admin-sidebar">
        <SideMenu />
      </el-aside>
      <el-main class="admin-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.admin-layout {
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

.admin-header {
  height: 60px;
  padding: 0;
  margin: 0;
}

.admin-body {
  height: calc(100vh - 60px);
  margin: 0;
  padding: 0;
}

.admin-sidebar {
  width: 220px;
  height: 100%;
  background-color: #001529;
  margin: 0;
  padding: 0;
}

.admin-content {
  flex: 1;
  background-color: #f0f2f5;
  padding: 20px;
  margin: 0;
  overflow-y: auto;
}
</style>