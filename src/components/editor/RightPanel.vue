<template>
    <div class="config-panel">
        <div v-if="activeComponent" class="panel-content">
            <h3>属性配置</h3>
            <div v-if="activeComponentMeta">
                <el-form label-width="80px" label-position="top">
                    <el-form-item v-for="prop in activeComponentMeta.props" :key="prop.name" :label="prop.title">
                        <!-- 字符串输入 -->
                        <el-input v-if="prop.type === 'string'" :model-value="activeComponent.props[prop.name]"
                            @update:model-value="
                                (val: any) => handlePropChange(prop.name, val)
                            " />
                        <!-- 数字输入 -->
                        <el-input-number v-if="prop.type === 'number'" :model-value="activeComponent.props[prop.name]"
                            @update:model-value="
                                (val: any) => handlePropChange(prop.name, val)
                            " controls-position="right" style="width: 100%;" />
                        <!-- 布尔开关 -->
                        <el-switch v-if="prop.type === 'boolean'" :model-value="activeComponent.props[prop.name]"
                            @update:model-value="
                                (val: any) => handlePropChange(prop.name, val)
                            " />
                        <!-- 下拉选择 -->
                        <el-select v-if="prop.type === 'select'" :model-value="activeComponent.props[prop.name]"
                            @update:model-value="
                                (val: any) => handlePropChange(prop.name, val)
                            " placeholder="请选择" style="width: 100%;">
                            <el-option v-for="option in prop.options" :key="option" :label="option" :value="option" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div v-else class="placeholder">
            <p>请在画布中选择一个组件</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCanvasStore } from '@/stores/canvasStore'
import { materialsMap } from '@/components/materials'

const store = useCanvasStore()
const activeComponent = computed(() => store.activeComponent)

// 获取当前选中组件的元信息
const activeComponentMeta = computed(() => {
    if (!activeComponent.value) return null
    return materialsMap.get(activeComponent.value.componentName)
})

// 属性变更处理器
const handlePropChange = (propName: string, value: any) => {
    if (!activeComponent.value) return
    store.updateComponentProps(activeComponent.value.id, propName, value)
}
</script>

<style scoped>
.config-panel {
    padding: 10px;
    height: 100%;
}

.panel-content {
    height: 100%;
    overflow-y: auto;
}

.placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #909399;
    text-align: center;
}
</style>