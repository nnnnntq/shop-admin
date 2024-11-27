// 导入 axios 库，axios 是一个用于发起 HTTP 请求的 JavaScript 库
import axios from "axios"
// import { ElNotification } from 'element-plus'//引入消息通知方法
import { toast } from "./composables/util" //引用封装的在util.js中的toast方法
// import { useCookies } from '@vueuse/integrations/useCookies'//引入useCookies
import { getToken } from "./composables/auth"

// 创建一个 axios 实例，实例化后可以配置一些默认的请求设置
const service = axios.create({
    // 配置基础 URL，所有发起的请求都会以该 URL 为前缀
    // 可以在请求中省略基础 URL 部分，直接使用相对路径
    baseURL: "/api" //这里用/api代替了域名http://ceshi13.dishait.cn，域名在vite.config.js中已经设置了代理
})

// 添加请求拦截器
service.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        //往header头自动添加token
        // const cookie = useCookies()
        // const token = cookie.get("admin-token")
        const token = getToken()
        if (token) {
            //只有当token有值时执行
            config.headers["token"] = token
        }
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
service.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        return response.data.data
    },
    function (error) {
        // 对响应错误做点什么
        // console.log("err:", err.response.data);
        //提示错误
        toast(error.response.data.msg || "请求失败", "error")
        // ElNotification({
        //     message: error.response.data.msg || "请求失败",
        //     type: 'error',
        //     duration: 3000,
        //  })
        return Promise.reject(error)
    }
)

// 导出 axios 实例，以便在其他文件中可以引入并使用
export default service
