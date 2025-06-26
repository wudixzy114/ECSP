<template>
    <div class="style-four-input">
        <div class="label">{{ label }}</div>
        <div class="input-group">
            <el-input-number :model-value="values.top"
                @update:model-value="(val: number | undefined) => handleChange('top', val)" placeholder="上"
                :controls="false" />
            <el-input-number :model-value="values.right"
                @update:model-value="(val: number | undefined) => handleChange('right', val)" placeholder="右"
                :controls="false" />
            <el-input-number :model-value="values.bottom"
                @update:model-value="(val: number | undefined) => handleChange('bottom', val)" placeholder="下"
                :controls="false" />
            <el-input-number :model-value="values.left"
                @update:model-value="(val: number | undefined) => handleChange('left', val)" placeholder="左"
                :controls="false" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    modelValue: Record<string, any>;
    label: string;
    propNames: [string, string, string, string]; // [top, right, bottom, left]
}>();

const emit = defineEmits(['update:modelValue']);

const values = computed(() => ({
    top: parseInt(props.modelValue?.[props.propNames[0]]) || 0,
    right: parseInt(props.modelValue?.[props.propNames[1]]) || 0,
    bottom: parseInt(props.modelValue?.[props.propNames[2]]) || 0,
    left: parseInt(props.modelValue?.[props.propNames[3]]) || 0,
}));

const handleChange = (direction: 'top' | 'right' | 'bottom' | 'left', value: number | undefined) => {
    const propMap = {
        top: props.propNames[0],
        right: props.propNames[1],
        bottom: props.propNames[2],
        left: props.propNames[3],
    };
    const propName = propMap[direction];
    const newValue = value ? `${value}px` : undefined;
    emit('update:modelValue', { [propName]: newValue });
};
</script>

<style scoped>
.style-four-input {
    display: flex;
    align-items: center;
    width: 100%;
}

.label {
    width: 80px;
    padding-right: 12px;
    text-align: right;
    font-size: 14px;
}

.input-group {
    display: flex;
    gap: 4px;
}

.input-group :deep(.el-input-number) {
    width: 50px;
}

.input-group :deep(.el-input__inner) {
    padding: 0 5px;
    text-align: center;
}
</style>