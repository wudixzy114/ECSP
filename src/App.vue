<template>
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
</template>

<script setup lang="ts">
import LeftPanel from './components/editor/LeftPanel.vue';
import MainCanvas from './components/editor/MainCanvas.vue';
import RightPanel from './components/editor/RightPanel.vue';
</script>

<style>
html,
body,
#app,
.main-container {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  /* 防止出现多余滚动条 */
}

.main-container .el-aside {
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  height: 100%;
  overflow-y: auto;
}

.main-canvas-container {
  padding: 0;
  height: 100%;
}
</style>