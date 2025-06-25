import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

// 引入 Element Plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 全局样式
import "./assets/main.css";

import { historyPlugin } from "./stores/plugins/historyPlugin";

const app = createApp(App);
const pinia = createPinia();

// 注册所有 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

pinia.use(historyPlugin);

app.use(pinia);
app.use(ElementPlus);

app.mount("#app");
