<template>
    <div class="data-card">
        <!-- 子组件将通过插槽被渲染进来 -->
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
// 目前不需要任何逻辑
</script>

<style scoped>
.data-card {
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    /* 
      这里可以定义卡片的默认布局, 
      但为了让用户的样式配置能覆盖，我们尽量保持简洁。
      用户的 style.display = 'flex' 会被应用到 renderer-wrapper 上，
      从而控制这里的布局。
    */
}
</style>