<template>
    <div class="outline-tree-container">
        <OutlineNode v-for="child in store.pageSchema.children" :key="child.id" :schema="child" />
    </div>
</template>

<script setup lang="ts">
import { useCanvasStore } from '@/stores/canvasStore';
import OutlineNode from './OutlineNode.vue';

const store = useCanvasStore();
</script>