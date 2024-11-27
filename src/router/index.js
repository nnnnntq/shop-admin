import { createRouter, createWebHashHistory } from "vue-router"

//引入页面
import index from "../pages/index.vue"
import about from "../pages/about.vue"
import NotFound from "../pages/404.vue"
import login from "../pages/login.vue"

//引入layout主布局页面
import Admin from "../layouts/admin.vue"
import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs"
//引入商品页面
import goodslist from "../pages/goods/good_list.vue"
import categoryList from "../pages/category/category-list.vue"
import userlist from "../pages/user/user_list.vue"
import commentlist from "../pages/comment/comment_list.vue"
import coupons_list from "../pages/coupons/coupons_list.vue"
import image_list from "../pages/image/image_list.vue"
import notice_list from "../pages/notice/notice_list.vue"
import order_list from "../pages/order/order_list.vue"
import settingBase from "../pages/setting/base.vue"
// const routes = [
//     {
//         path: "/",
//         component: Admin,
//         //子路由
//         children: [
//             {
//                 path: "/",
//                 component: index,
//                 meta: {
//                     title: "后台首页"
//                 }
//             },
//             {
//                 path: "/goods/list",
//                 component: goodslist,
//                 meta: {
//                     title: "商品管理"
//                 }
//             },
//             {
//                 path: "/category/list",
//                 component: categoryList,
//                 meta: {
//                     title: "分类列表"
//                 }
//             }
//         ]
//     },
//     {
//         path: "/about",
//         component: about
//     },
//     {
//         path: "/login",
//         component: login,
//         meta: {
//             title: "登陆页"
//         }
//     },
//     { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound }
// ]

//默认路由，所有用户共享
const routes = [
    {
        path: "/",
        name: "admin",
        component: Admin
    },
    {
        path: "/about",
        component: about
    },
    {
        path: "/login",
        component: login,
        meta: {
            title: "登陆页"
        }
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound }
]

//动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [
    {
        path: "/",
        name: "/",
        component: index,
        meta: {
            title: "后台首页"
        }
    },
    {
        path: "/goods/list",
        name: "/goods/list",
        component: goodslist,
        meta: {
            title: "商品管理"
        }
    },
    {
        path: "/category/list",
        name: "/category/list",
        component: categoryList,
        meta: {
            title: "分类列表"
        }
    },
    {
        path: "/user/list",
        name: "/user/list",
        component: userlist,
        meta: {
            title: "用户列表"
        }
    },
    {
        path: "/comment/list",
        name: "/comment/list",
        component: commentlist,
        meta: {
            title: "评论管理"
        }
    },
    {
        path: "/coupon/list",
        name: "/coupon/list",
        component: coupons_list,
        meta: {
            title: "优惠券列表"
        }
    },
    {
        path: "/order/list",
        name: "/order/list",
        component: order_list,
        meta: {
            title: "订单列表"
        }
    },
    {
        path: "/image/list",
        name: "/image/list",
        component: image_list,
        meta: {
            title: "图库列表"
        }
    },
    {
        path: "/notice/list",
        name: "/notice/list",
        component: notice_list,
        meta: {
            title: "公告列表"
        }
    },
    {
        path: "/setting/base",
        name: "/setting/base",
        component: settingBase,
        meta: {
            title: "配置"
        }
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//定义一个动态添加路由的方法
export function addRoutes(menus) {
    //是否有新的路由
    let hasNewRouters = false
    const findAndAddRouterdByMenus = (arr) => {
        arr.forEach((e) => {
            let item = asyncRoutes.find((o) => o.path == e.frontpath)
            if (item && !router.hasRoute(item.path)) {
                router.addRoute("admin", item)
                hasNewRouters = true
            }
            if (e.child && e.child.length > 0) {
                findAndAddRouterdByMenus(e.child)
            }
        })
    }
    findAndAddRouterdByMenus(menus)
    console.log(router.getRoutes())
    return hasNewRouters
}
