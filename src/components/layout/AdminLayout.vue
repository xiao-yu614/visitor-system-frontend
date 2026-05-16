<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderBar from './HeaderBar.vue'
import SideMenu from './SideMenu.vue'
</script>

<template>
  <el-container class="admin-layout">
    <el-header>
      <HeaderBar />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <SideMenu />
      </el-aside>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.admin-layout {
  height: 100vh;
}
</style>
