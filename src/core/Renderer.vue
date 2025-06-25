<template>
    <div class="renderer-wrapper"
        :class="{ active: store.activeComponentId === schema.id, 'is-container': isContainer }"
        @click.stop="handleSelectComponent">
        <component :is="componentMap[schema.componentName]" v-bind="schema.props" class="render-component-inner">
            <!-- 按钮文本 -->
            <template v-if="schema.componentName === 'ElButton'">
                {{ schema.props.text || '按钮' }}
            </template>

            <!-- 容器组件的子节点渲染 -->
            <template v-if="isContainer">
                <draggable :model-value="[...schema.children!]"
                    @update:model-value="(newChildren) => store.updateChildren(schema.id, newChildren)"
                    class="container-draggable" item-key="id" group="componentsGroup" handle=".renderer-wrapper">
                    <template #item="{ element }">
                        <Renderer :schema="element" />
                    </template>
                </draggable>
            </template>
        </component>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElButton, ElRow } from 'element-plus';
import draggable from 'vuedraggable-es';
import type { ComponentSchema } from '@/types/ast';
import { useCanvasStore } from '@/stores/canvasStore';
import Renderer from './Renderer.vue';

const props = defineProps<{
    schema: ComponentSchema;
}>();

const componentMap: Record<string, any> = {
    ElButton,
    ElRow,
};

const store = useCanvasStore();
const isContainer = computed(() => Array.isArray(props.schema.children));

const handleSelectComponent = () => {
    store.setActiveComponentId(props.schema.id);
};
</script>

<style scoped>
.renderer-wrapper {
    position: relative;
    padding: 2px;
    border: 1px dashed transparent;
    transition: border-color 0.2s;
    cursor: move;
}

.renderer-wrapper:hover {
    border-color: #409eff;
}

.renderer-wrapper.active {
    border: 2px solid #409eff;
    z-index: 1;
}

/*
    规则一：让所有渲染出的内部组件对鼠标事件免疫，
    这样事件才能到达外层的 .renderer-wrapper，解决拖拽手柄问题。
  */
.render-component-inner {
    pointer-events: none;
}

/*
    [！！！最终的关键修复！！！]
    规则二：但是，我们必须“复活”容器组件内部的拖放区域，
    让它可以接收鼠标事件，从而能够响应拖放。
    `auto` 会恢复 pointer-events 的默认行为。
  */
.container-draggable {
    pointer-events: auto;
}

/* 容器组件的样式 */
.is-container> :deep(.el-row) {
    position: relative;
    min-height: 50px;
    padding: 10px;
    border: 1px solid #dcdfe6;
    background-color: rgba(64, 158, 255, 0.05);
}

.container-draggable {
    min-height: 40px;
    width: 100%;
    height: 100%;
}

.is-container> :deep(.el-row .container-draggable:empty)::after {
    content: '将组件拖到此处';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #c0c4cc;
    font-size: 14px;
    /* 占位符本身不应该捕获事件 */
    pointer-events: none;
}
</style>