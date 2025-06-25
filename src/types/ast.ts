// 物料组件的属性定义
export interface ComponentProp {
  name: string;
  title: string;
  type: "string" | "number" | "boolean" | "select";
  options?: any[]; // for select type
  defaultValue?: any;
}

// 物料组件的元信息
export interface ComponentMeta {
  componentName: string;
  title: string;
  icon?: string;
  props: ComponentProp[];
  events?: Record<string, string>;
}

// 画布中的一个组件实例节点
export interface ComponentSchema {
  id: string; // 唯一ID
  componentName: string;
  props: Record<string, any>;
  children?: ComponentSchema[];
  // style: Record<string, any>; // 暂不实现
  // events: Record<string, any>; // 暂不实现
}

// 整个页面的Schema
export interface PageSchema {
  id: string;
  componentName: "Page";
  props: Record<string, any>;
  children: ComponentSchema[];
}
