<template>
    <div class="renderer-wrapper"
        :class="{ active: store.activeComponentId === schema.id, 'is-container': isContainer }"
        @click.stop="handleSelectComponent">
        <component :is="componentMap[schema.componentName]" v-bind="filteredProps" class="render-component-inner">
            <!-- 我们自定义的 text prop 只在这里使用，通过插槽传递给按钮 -->
            <template v-if="schema.componentName === 'ElButton'">
                {{ schema.props.text || '按钮' }}
            </template>

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

// [最终修复]
// 这个计算属性的唯一目的，是防止我们将自定义的、与原生prop命名冲突的属性
// 直接传递给底层组件，从而避免类型警告。
const filteredProps = computed(() => {
    const realProps = { ...props.schema.props };

    // 如果是按钮，删除我们自定义的text属性，因为它与ElButton的Boolean类型的text prop冲突
    if (props.schema.componentName === 'ElButton') {
        delete realProps.text;
    }

    // 未来如果其他组件也有类似冲突，可以在此扩展
    // if (props.schema.componentName === 'SomeOtherComponent') {
    //   delete realProps.customProp;
    // }

    return realProps;
});

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
/* 样式保持不变 */
.renderer-wrapper {
    position: relative;
    padding: 2px;
    border: 1px dashed transparent;
    transition: border-color .2s;
    cursor: move
}

.renderer-wrapper:hover {
    border-color: #409eff
}

.renderer-wrapper.active {
    border: 2px solid #409eff;
    z-index: 1
}

.render-component-inner {
    pointer-events: none
}

.container-draggable {
    pointer-events: auto
}

.is-container>:deep(.el-row) {
    position: relative;
    min-height: 50px;
    padding: 10px;
    border: 1px solid #dcdfe6;
    background-color: rgba(64, 158, 255, .05)
}

.container-draggable {
    min-height: 40px;
    width: 100%;
    height: 100%
}

.is-container>:deep(.el-row .container-draggable:empty)::after {
    content: '将组件拖到此处';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #c0c4cc;
    font-size: 14px;
    pointer-events: none
}
</style>