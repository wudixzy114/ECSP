<template>
    <div class="outline-node">
        <div class="node-label" :class="{ active: isActive }" :style="{ paddingLeft: `${depth * 15}px` }"
            @click.stop="handleSelect">
            <el-icon class="node-icon">
                <component :is="meta?.icon || 'QuestionFilled'" />
            </el-icon>
            <span class="node-title">{{ meta?.title || schema.componentName }}</span>
        </div>
        <div v-if="schema.children && schema.children.length > 0" class="node-children">
            <OutlineNode v-for="child in schema.children" :key="child.id" :schema="child" :depth="depth + 1" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ComponentSchema } from '@/types/ast';
import { useCanvasStore } from '@/stores/canvasStore';
import { materialsMap } from '@/components/materials';

const props = withDefaults(defineProps<{
    schema: ComponentSchema,
    depth?: number
}>(), {
    depth: 0
})

const store = useCanvasStore()

// 获取组件的元数据，用于显示标题和图标
const meta = computed(() => materialsMap.get(props.schema.componentName))

// 判断当前节点是否被选中
const isActive = computed(() => store.activeComponentId === props.schema.id)

// 点击节点时，设置其为激活组件
const handleSelect = () => {
    store.setActiveComponentId(props.schema.id)
}
</script>

<style scoped>
.node-label {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-size: 14px;
}

.node-label:hover {
    background-color: #f0f2f5;
}

.node-label.active {
    background-color: #e8f4ff;
    color: #409eff;
}

.node-icon {
    margin-right: 6px;
}
</style>