<template>
    <!-- 设计时包裹层，用于添加选中、拖拽等交互 -->
    <div class="renderer-wrapper" :class="{ active: store.activeComponentId === schema.id }"
        @click.stop="handleSelectComponent">
        <!-- 真正的组件 -->
        <component :is="componentMap[schema.componentName]" v-bind="schema.props">
            <!-- 特殊处理按钮的文本，它在Element Plus中是slot -->
            <template v-if="schema.componentName === 'ElButton'">
                {{ schema.props.text || '按钮' }}
            </template>

            <!-- 递归渲染子组件 -->
            <template v-if="schema.children && schema.children.length">
                <Renderer v-for="child in schema.children" :key="child.id" :schema="child" />
            </template>
        </component>
    </div>
</template>

<script setup lang="ts">
import { ElButton, ElRow } from 'element-plus'
import type { ComponentSchema } from '@/types/ast'
import { useCanvasStore } from '@/stores/canvasStore';

const props = defineProps<{
    schema: ComponentSchema
}>()

// 组件映射表，将组件名映射到真实组件
const componentMap: Record<string, any> = {
    ElButton,
    ElRow,
}

const store = useCanvasStore()

const handleSelectComponent = () => {
    store.setActiveComponentId(props.schema.id)
}
</script>

<style scoped>
.renderer-wrapper {
    position: relative;
    padding: 2px;
    border: 1px dashed transparent;
    transition: border-color 0.2s;
}

.renderer-wrapper:hover {
    border-color: #409eff;
}

.renderer-wrapper.active {
    border: 2px solid #409eff;
}

/* 针对布局容器的最小高度，方便拖入组件 */
.renderer-wrapper :deep(.el-row) {
    min-height: 50px;
}
</style>