<template>
    <div class="canvas-wrapper">
        <draggable :model-value="[...store.pageSchema.children]"
            @update:model-value="(newChildren) => store.updateChildren('root', newChildren)"
            class="main-canvas-draggable" item-key="id" group="componentsGroup" handle=".renderer-wrapper">
            <template #item="{ element }">
                <Renderer :schema="element" />
            </template>
        </draggable>
    </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable-es'
import Renderer from '@/core/Renderer.vue'
import { useCanvasStore } from '@/stores/canvasStore'

const store = useCanvasStore()
</script>

<style>
.canvas-wrapper {
    flex: 1;
    overflow: auto;
    padding: 20px;
    background-color: #f0f2f5;
    height: 100%;
    box-sizing: border-box;
}

.main-canvas-draggable {
    min-height: 100%;
    /* 确保拖拽区域足够大 */
}
</style>