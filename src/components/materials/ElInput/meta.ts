import type { ComponentMeta } from "@/types/ast";

const meta: ComponentMeta = {
  componentName: "ElInput",
  title: "输入框",
  icon: "Edit",
  props: [
    { name: "modelValue", title: "绑定值", type: "string", defaultValue: "" },
    {
      name: "placeholder",
      title: "占位提示",
      type: "string",
      defaultValue: "请输入内容",
    },
    { name: "disabled", title: "禁用", type: "boolean", defaultValue: false },
    {
      name: "clearable",
      title: "可清空",
      type: "boolean",
      defaultValue: false,
    },
  ],
};

export default meta;
