import ElButtonMeta from "./ElButton/meta";
import ElRowMeta from "./ElRow/meta";
import ElInputMeta from "./ElInput/meta"; // [新增]
import ElSelectMeta from "./ElSelect/meta"; // [新增]
import ElTextMeta from "./ElText/meta"; // [新增]
import type { ComponentMeta } from "@/types/ast";
import DataCardMeta from "./DataCard/meta";

// 导出所有物料的元信息
export const materials: ComponentMeta[] = [
  ElButtonMeta,
  ElRowMeta,
  ElInputMeta,
  ElSelectMeta,
  ElTextMeta,

  DataCardMeta,
];

// 方便通过组件名查找元信息
export const materialsMap = new Map<string, ComponentMeta>();
materials.forEach((item) => {
  materialsMap.set(item.componentName, item);
});
