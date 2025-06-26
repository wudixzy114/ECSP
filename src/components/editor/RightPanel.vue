<template>
    <div class="config-panel">
        <div v-if="activeComponent" class="panel-content">
            <!-- [新增] 使用Tabs来组织面板 -->
            <el-tabs v-model="activeTab">
                <el-tab-pane label="属性" name="props">
                    <el-form label-width="80px" label-position="top">
                        <el-form-item v-for="prop in activeComponentMeta?.props" :key="prop.name" :label="prop.title">
                            <el-input v-if="prop.type === 'string'" :model-value="activeComponent.props[prop.name]"
                                @update:model-value="(val: any) => handlePropChange(prop.name, val)" />
                            <el-input-number v-if="prop.type === 'number'"
                                :model-value="activeComponent.props[prop.name]"
                                @update:model-value="(val: any) => handlePropChange(prop.name, val)"
                                controls-position="right" style="width: 100%;" />
                            <el-switch v-if="prop.type === 'boolean'" :model-value="activeComponent.props[prop.name]"
                                @update:model-value="(val: any) => handlePropChange(prop.name, val)" />
                            <el-select v-if="prop.type === 'select'" :model-value="activeComponent.props[prop.name]"
                                @update:model-value="(val: any) => handlePropChange(prop.name, val)" placeholder="请选择"
                                style="width: 100%;">
                                <el-option v-for="option in prop.options" :key="option" :label="option"
                                    :value="option" />
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

                <!-- [新增] 样式配置面板 -->
                <el-tab-pane label="样式" name="style">
                    <el-form label-width="80px" label-position="top">
                        <!-- 布局 -->
                        <el-divider>布局</el-divider>
                        <el-form-item label="显示模式">
                            <el-radio-group :model-value="activeComponent.style?.display"
                                @update:model-value="(val: any) => handleStyleChange({ display: val })">
                                <el-radio-button label="block">Block</el-radio-button>
                                <el-radio-button label="flex">Flex</el-radio-button>
                                <el-radio-button label="inline-block">Inline-Block</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <!-- Flex 布局相关，仅当 display: flex 时显示 -->
                        <template v-if="activeComponent.style?.display === 'flex'">
                            <el-form-item label="主轴方向">
                                <el-radio-group :model-value="activeComponent.style?.flexDirection"
                                    @update:model-value="(val: any) => handleStyleChange({ flexDirection: val })">
                                    <el-radio-button label="row">row</el-radio-button>
                                    <el-radio-button label="column">column</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="主轴对齐">
                                <el-select :model-value="activeComponent.style?.justifyContent"
                                    @update:model-value="(val: any) => handleStyleChange({ justifyContent: val })"
                                    clearable>
                                    <el-option label="flex-start" value="flex-start" />
                                    <el-option label="center" value="center" />
                                    <el-option label="flex-end" value="flex-end" />
                                    <el-option label="space-between" value="space-between" />
                                    <el-option label="space-around" value="space-around" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="交叉轴对齐">
                                <el-select :model-value="activeComponent.style?.alignItems"
                                    @update:model-value="(val: any) => handleStyleChange({ alignItems: val })"
                                    clearable>
                                    <el-option label="flex-start" value="flex-start" />
                                    <el-option label="center" value="center" />
                                    <el-option label="flex-end" value="flex-end" />
                                    <el-option label="stretch" value="stretch" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="子项间隔(gap)">
                                <el-input-number :model-value="parseInt(activeComponent.style?.gap) || undefined"
                                    @update:model-value="(val: any) => handleStyleChange({ gap: val ? `${val}px` : undefined })" />
                            </el-form-item>
                        </template>
                        <el-divider>盒模型</el-divider>
                        <el-form-item>
                            <StyleFourInput label="外边距" :model-value="activeComponent.style || {}"
                                :prop-names="['marginTop', 'marginRight', 'marginBottom', 'marginLeft']"
                                @update:model-value="newVal => handleStyleChange(newVal)" />
                        </el-form-item>
                        <el-form-item>
                            <StyleFourInput label="内边距" :model-value="activeComponent.style || {}"
                                :prop-names="['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft']"
                                @update:model-value="newVal => handleStyleChange(newVal)" />
                        </el-form-item>
                        <el-form-item label="宽度">
                            <el-input :model-value="activeComponent.style?.width"
                                @update:model-value="(val: any) => handleStyleChange({ width: val })"
                                placeholder="e.g. 100px or 50%" />
                        </el-form-item>
                        <el-form-item label="高度">
                            <el-input :model-value="activeComponent.style?.height"
                                @update:model-value="(val: any) => handleStyleChange({ height: val })"
                                placeholder="e.g. 100px or auto" />
                        </el-form-item>

                        <el-divider>字体与颜色</el-divider>
                        <el-form-item label="字体大小">
                            <el-input-number :model-value="parseInt(activeComponent.style?.fontSize) || undefined"
                                @update:model-value="(val: any) => handleStyleChange({ fontSize: val ? `${val}px` : undefined })" />
                        </el-form-item>
                        <el-form-item label="字体颜色">
                            <el-color-picker :model-value="activeComponent.style?.color"
                                @update:model-value="(val: any) => handleStyleChange({ color: val })" show-alpha />
                        </el-form-item>
                        <el-form-item label="背景颜色">
                            <el-color-picker :model-value="activeComponent.style?.backgroundColor"
                                @update:model-value="(val: any) => handleStyleChange({ backgroundColor: val })"
                                show-alpha />
                        </el-form-item>
                        <el-form-item label="圆角">
                            <el-input-number :model-value="parseInt(activeComponent.style?.borderRadius) || undefined"
                                @update:model-value="(val: any) => handleStyleChange({ borderRadius: val ? `${val}px` : undefined })" />
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div v-else class="placeholder">
            <p>请在画布中选择一个组件</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCanvasStore } from '@/stores/canvasStore'
import { materialsMap } from '@/components/materials'
import StyleFourInput from './StyleFourInput.vue' // [新增] 引入新组件

const store = useCanvasStore()
const activeComponent = computed(() => store.activeComponent)
const activeComponentMeta = computed(() => {
    if (!activeComponent.value) return null
    return materialsMap.get(activeComponent.value.componentName)
})

const activeTab = ref('props');

// 属性变更处理器 (保持不变)
const handlePropChange = (propName: string, value: any) => {
    if (!activeComponent.value) return
    store.updateComponentProps(activeComponent.value.id, propName, value)
}

// [新增] 样式变更处理器
const handleStyleChange = (styleObject: Record<string, any>) => {
    if (!activeComponent.value) return;
    store.updateComponentStyle(activeComponent.value.id, styleObject);
};
</script>

<style scoped>
.config-panel {
    padding: 10px;
    height: 100%;
    box-sizing: border-box;
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

.config-panel :deep(.el-tabs__content) {
    padding-top: 10px;
}
</style>