import ElButtonMeta from "./ElButton/meta";
import ElRowMeta from "./ElRow/meta";
import type { ComponentMeta } from "@/types/ast";

// 导出所有物料的元信息
export const materials: ComponentMeta[] = [ElButtonMeta, ElRowMeta];

// 方便通过组件名查找元信息
export const materialsMap = new Map<string, ComponentMeta>();
materials.forEach((item) => {
  materialsMap.set(item.componentName, item);
});
