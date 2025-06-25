<template>
  <el-container class="main-container">
    <el-aside width="250px" class="left-panel">左侧面板</el-aside>
    <el-main class="main-canvas">
      <Renderer v-for="item in store.pageSchema.children" :key="item.id" :schema="item" />
    </el-main>
    <el-aside width="300px" class="right-panel">右侧面板</el-aside>
  </el-container>
</template>

<script setup lang="ts">
import Renderer from './core/Renderer.vue';
import { useCanvasStore } from './stores/canvasStore';

const store = useCanvasStore();
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.main-container {
  height: 100%;
}

.left-panel,
.right-panel {
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  padding: 10px;
}

.main-canvas {
  background-color: #f0f2f5;
  padding: 20px;
}
</style>