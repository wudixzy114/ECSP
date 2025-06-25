import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { nanoid } from "nanoid";
import type { PageSchema, ComponentSchema } from "@/types/ast";

// 辅助函数：在树中查找节点
function findNodeById(
  tree: ComponentSchema[],
  id: string
): ComponentSchema | null {
  for (const node of tree) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

export const useCanvasStore = defineStore("canvas", () => {
  // 页面全局Schema
  const pageSchema = ref<PageSchema>({
    id: "root",
    componentName: "Page",
    props: { title: "我的应用" },
    // 为了演示，我们先放一个静态的按钮
    children: [
      {
        id: nanoid(6),
        componentName: "ElButton",
        props: {
          type: "primary",
          text: "我是静态按钮",
        },
      },
    ],
  });

  // 当前激活（选中）的组件ID
  const activeComponentId = ref<string | null>(null);

  // 通过ID获取当前激活的组件Schema
  const activeComponent = computed(() => {
    if (!activeComponentId.value) return null;
    return findNodeById(pageSchema.value.children, activeComponentId.value);
  });

  // 设置激活的组件
  function setActiveComponentId(id: string | null) {
    activeComponentId.value = id;
  }

  return {
    pageSchema,
    activeComponentId,
    activeComponent,
    setActiveComponentId,
  };
});
