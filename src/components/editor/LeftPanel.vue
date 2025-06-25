<template>
    <el-tabs v-model="activeTab" class="left-panel-tabs">
        <el-tab-pane label="组件库" name="components">
            <div class="component-list">
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
        </el-tab-pane>
        <el-tab-pane label="大纲树" name="outline">
            <!-- [新增] 引入大纲树组件 -->
            <OutlineTree />
        </el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable-es'
import { materials, materialsMap } from '@/components/materials'
import type { ComponentMeta, ComponentSchema } from '@/types/ast'
import { nanoid } from 'nanoid'
// [新增] 引入新的大纲树组件
import OutlineTree from './OutlineTree.vue'

const activeTab = ref('components')

const cloneComponent = (meta: ComponentMeta): ComponentSchema => {
    const componentMeta = materialsMap.get(meta.componentName)
    if (!componentMeta) {
        throw new Error('Component not found')
    }

    const newComponent: ComponentSchema = {
        id: nanoid(6),
        componentName: componentMeta.componentName,
        props: {},
    }

    componentMeta.props.forEach(prop => {
        if (prop.defaultValue !== undefined) {
            newComponent.props[prop.name] = prop.defaultValue
        }
    })

    if (Array.isArray(materialsMap.get(meta.componentName)?.props)) {
        if (meta.componentName === 'ElRow') {
            newComponent.children = []
        }
    }


    return newComponent
}
</script>

<style scoped>
.left-panel-tabs {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.left-panel-tabs> :deep(.el-tabs__content) {
    flex: 1;
    overflow-y: auto;
}

.component-list,
.outline-tree-container {
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
    transition: all 0.2s;
}

.component-item:hover {
    border-color: #409eff;
    color: #409eff;
}

.component-item .el-icon {
    margin-right: 8px;
}
</style>