import type { ComponentMeta } from "@/types/ast";

const meta: ComponentMeta = {
  componentName: "ElRow",
  title: "栅格布局",
  icon: "Grid",
  props: [
    { name: "gutter", title: "栅格间隔", type: "number", defaultValue: 0 },
  ],
};

export default meta;
