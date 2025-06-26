import type { ComponentMeta } from "@/types/ast";

const meta: ComponentMeta = {
  componentName: "ElSelect",
  title: "选择器",
  icon: "ArrowDownBold",
  props: [
    { name: "modelValue", title: "绑定值", type: "string", defaultValue: "" },
    {
      name: "placeholder",
      title: "占位提示",
      type: "string",
      defaultValue: "请选择",
    },
    { name: "disabled", title: "禁用", type: "boolean", defaultValue: false },
    {
      name: "clearable",
      title: "可清空",
      type: "boolean",
      defaultValue: false,
    },
    // 注意：这里的 options 是一个简化的示例，实际项目中应更复杂
    // { name: 'options', title: '选项', type: 'array', defaultValue: [{label: '选项1', value: '1'}, {label: '选项2', value: '2'}] },
  ],
};

export default meta;
