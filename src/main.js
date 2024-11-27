import { createApp } from "vue"
import "./style.css"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import App from "./App.vue"
// import router from "./router" //引入路由
import { router } from "./router" //引入路由
import * as ElementPlusIconsVue from "@element-plus/icons-vue" //引入图标
import store from "./store" //引入
import "./permission" //引入
// createApp(App).mount('#app')
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)

//全局引入图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

import "virtual:windi.css"
import "nprogress/nprogress.css" //全局loading进度条实现

app.mount("#app")
