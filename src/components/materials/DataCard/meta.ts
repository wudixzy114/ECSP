import type { ComponentMeta } from "@/types/ast";
import { nanoid } from "nanoid";

const meta: ComponentMeta = {
  componentName: "DataCard",
  title: "数据卡片",
  icon: "Postcard",
  props: [
    // 注意：这里的props是给DataCard自身的，但目前DataCard是纯容器，
    // 它的内容由子节点决定。一个更高级的设计是，子节点的props可以
    // 绑定到父级DataCard的props上，例如子节点的text绑定到`parent.props.title`
    // 我们暂时简化，这里的props留空或用于控制卡片自身行为。
  ],
  defaultSchema: {
    id: nanoid(6), // 必须有一个初始ID
    componentName: "DataCard", // [关键修复] 顶层是DataCard自身
    props: {},
    style: {
      display: "flex",
      flexDirection: "column",
    },
    children: [
      // ... 子节点结构保持不变
      {
        id: nanoid(6),
        componentName: "ElText",
        props: { text: "卡片标题", size: "large" },
        style: { marginBottom: "10px" },
      },
      {
        id: nanoid(6),
        componentName: "ElText",
        props: { text: "这是一段详细的卡片内容描述..." },
        style: { marginBottom: "20px" },
      },
      {
        id: nanoid(6),
        componentName: "ElButton",
        props: { text: "查看详情", type: "primary" },
        style: {},
      },
    ],
  },
};

export default meta;
