import type { ComponentMeta } from "@/types/ast";

const meta: ComponentMeta = {
  componentName: "ElButton",
  title: "按钮",
  icon: "SwitchButton",
  props: [
    { name: "text", title: "文本", type: "string", defaultValue: "按钮" },
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
    { name: "disabled", title: "禁用", type: "boolean", defaultValue: false },
  ],
  events: {
    onClick: "点击事件",
  },
};

export default meta;
