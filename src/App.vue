<template>
  <el-container class="app-container">
    <!-- [新增] 顶部操作栏 -->
    <el-header height="50px" class="app-header">
      <Header />
    </el-header>
    <el-container class="main-container">
      <el-aside width="250px">
        <LeftPanel />
      </el-aside>
      <el-main class="main-canvas-container">
        <MainCanvas />
      </el-main>
      <el-aside width="300px">
        <RightPanel />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import LeftPanel from './components/editor/LeftPanel.vue';
import MainCanvas from './components/editor/MainCanvas.vue';
import RightPanel from './components/editor/RightPanel.vue';
// [新增] 引入 Header 组件
import Header from './components/editor/Header.vue';
</script>

<style>
html,
body,
#app,
.app-container {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.app-header {
  padding: 0;
  border-bottom: 1px solid var(--el-border-color);
}

.main-container {
  height: calc(100% - 50px);
}

.main-container .el-aside {
  height: 100%;
  overflow-y: auto;
}

.main-canvas-container {
  padding: 0;
  height: 100%;
}
</style>