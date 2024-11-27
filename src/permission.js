//permission.js
//用于存放权限验证相关内容

// import router from "./router"
import { router, addRoutes } from "./router"
import { getToken } from "./composables/auth"
import { toast, showFUllLoading, hideFUllLoading } from "./composables/util"
import store from "./store"

//全局前置守卫
let hasGetINfo = false //（后加的）防止重复请求，优化点击菜单加载速度
router.beforeEach(async (to, from, next) => {
    //显示loading
    showFUllLoading()

    // console.log("全局前置守卫,to,from", to, from)
    const token = getToken()
    //没有登陆，强制跳转至登陆页
    if (!token && to.path != "/login") {
        toast("请先登陆", "error")
        return next({ path: "/login" })
    }
    //防止重复登陆
    if (token && to.path == "/login") {
        toast("请勿重复登陆", "error")
        return next({ path: from.path ? from.path : "/" })
    }

    //如果用户登陆了，自动获取用户信息，并储存在vuex当中
    let hasNewRouters = false
    if (token && !hasGetINfo) {
        let { menus } = await store.dispatch("getinfo")
        //动态添加路由
        hasGetINfo = true
        hasNewRouters = addRoutes(menus)
    }

    //设置页面标题
    // console.log("to:", to.meta.title)
    let title = (to.meta.title ? to.meta.title : "") + "ntq's project"
    // let title = to.meta.title ? to.meta.title : ""
    document.title = title

    hasNewRouters ? next(to.fullPath) : next()
})

//全局后置守卫
router.afterEach((to, from) => hideFUllLoading())
