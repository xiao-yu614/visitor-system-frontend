<script setup lang="ts">
import HeaderBar from './HeaderBar.vue'
import SideMenu from './SideMenu.vue'
</script>

<template>
  <el-container class="admin-layout">
    <HeaderBar />
    <el-container class="main-container">
      <SideMenu />
      <el-main class="content-area">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.admin-layout {
  height: 100vh;
  width: 100%;
}

.main-container {
  height: calc(100vh - 60px);
}

.content-area {
  background-color: #f0f2f5;
  padding: 20px;
  overflow-y: auto;
}
</style>
