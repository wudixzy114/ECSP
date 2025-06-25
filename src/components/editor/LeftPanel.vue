<template>
    <div class="component-list">
        <h3>组件库</h3>
        <draggable :list="materials" :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
            :clone="cloneComponent" item-key="componentName" :sort="false">
            <template #item="{ element }">
                <div class="component-item">
                    <el-icon>
                        <component :is="element.icon" />
                    </el-icon>
                    <span>{{ element.title }}</span>
                </div>
            </template>
        </draggable>
    </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable-es'
import { materials, materialsMap } from '@/components/materials'
import type { ComponentMeta, ComponentSchema } from '@/types/ast'
import { nanoid } from 'nanoid'

// 拖拽克隆时调用的函数
const cloneComponent = (meta: ComponentMeta): ComponentSchema => {
    const componentMeta = materialsMap.get(meta.componentName)
    if (!componentMeta) {
        throw new Error('Component not found')
    }

    // 根据元信息创建新的组件Schema
    const newComponent: ComponentSchema = {
        id: nanoid(6),
        componentName: componentMeta.componentName,
        props: {},
    }

    // 设置默认属性值
    componentMeta.props.forEach(prop => {
        if (prop.defaultValue !== undefined) {
            newComponent.props[prop.name] = prop.defaultValue
        }
    })

    // 如果是容器组件，添加children数组
    if (componentMeta.componentName === 'ElRow') {
        newComponent.children = []
    }

    return newComponent
}
</script>

<style scoped>
.component-list {
    padding: 10px;
}

.component-item {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    margin-bottom: 8px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    cursor: grab;
    background-color: #fff;
}

.component-item:hover {
    border-color: #409eff;
    color: #409eff;
}

.component-item .el-icon {
    margin-right: 8px;
}
</style>