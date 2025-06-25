<template>
  <div class="editor-header">
    <div class="left-actions">
      <el-button-group>
        <el-tooltip content="撤销 (Cmd+Z)">
          <el-button :icon="Back" @click="store.undo()" />
        </el-tooltip>
        <el-tooltip content="重做 (Cmd+Shift+Z)">
          <el-button :icon="Right" @click="store.redo()" />
        </el-tooltip>
      </el-button-group>
    </div>
    <div class="right-actions">
      <!-- 预览和发布按钮的占位符 -->
      <el-button type="primary">预览</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCanvasStore } from '@/stores/canvasStore';
import { Back, Right } from '@element-plus/icons-vue'
import { onMounted, onUnmounted } from 'vue';

const store = useCanvasStore()

// [新增] 添加键盘快捷键
const handleKeyDown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
    e.preventDefault();
    if (e.shiftKey) {
      store.redo();
    } else {
      store.undo();
    }
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #ebeef5;
}
</style>