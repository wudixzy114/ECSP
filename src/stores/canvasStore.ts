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

function findAndRemoveNodeById(tree: ComponentSchema[], id: string): boolean {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].id === id) {
      tree.splice(i, 1);
      return true;
    }
    if (tree[i].children) {
      if (findAndRemoveNodeById(tree[i].children!, id)) {
        return true;
      }
    }
  }
  return false;
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
        style: {},
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

  function updateComponentProps(id: string, propName: string, value: any) {
    const component = findNodeById(pageSchema.value.children, id);
    if (component) {
      component.props[propName] = value;
    }
  }

  function updateChildren(parentId: string, newChildren: ComponentSchema[]) {
    const parentNode =
      parentId === "root"
        ? pageSchema.value
        : findNodeById(pageSchema.value.children, parentId);

    if (parentNode) {
      parentNode.children = newChildren;
    } else {
      console.error("Parent node not found:", parentId);
    }
  }

  function deleteComponent(id: string) {
    if (!id) return;
    findAndRemoveNodeById(pageSchema.value.children, id);
    // 如果删除的是当前选中的组件，清空选中状态
    if (activeComponentId.value === id) {
      activeComponentId.value = null;
    }
  }

  function undo() {
    // @ts-ignore
    this.undo();
  }

  function redo() {
    // @ts-ignore
    this.redo();
  }

  function updateComponentStyle(
    id: string,
    newStyleObject: Record<string, any>
  ) {
    const component = findNodeById(pageSchema.value.children, id);
    if (component) {
      // 使用对象扩展确保我们是合并样式，而不是完全替换
      component.style = { ...component.style, ...newStyleObject };
    }
  }

  return {
    pageSchema,
    activeComponentId,
    activeComponent,
    setActiveComponentId,
    updateComponentProps,
    updateChildren,
    deleteComponent,
    updateComponentStyle,
    undo,
    redo,
  };
});
