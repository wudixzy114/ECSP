import type { ComponentMeta } from "@/types/ast";

// 我们将使用 el-text 组件来渲染文本
const meta: ComponentMeta = {
  componentName: "ElText",
  title: "文本",
  icon: "Document",
  props: [
    {
      name: "text",
      title: "文本内容",
      type: "string",
      defaultValue: "这是一段文本",
    },
    {
      name: "type",
      title: "类型",
      type: "select",
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
    {
      name: "size",
      title: "尺寸",
      type: "select",
      options: ["large", "default", "small"],
    },
    { name: "truncated", title: "截断", type: "boolean", defaultValue: false },
  ],
};

export default meta;
