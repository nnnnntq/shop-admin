//manager.js
import axios from "../axios" // 导入自定义的 axios 实例

//登陆请求
export function login(username, password) {
    // 定义并导出 login 函数，接收用户名和密码作为参数
    return axios.post("/admin/login", {
        // 发送 POST 请求到 /admin/login 接口，并传递请求体
        username,
        password
    })
}

//获取管理员信息和权限菜单请求
export function getinfo() {
    return axios.post("/admin/getinfo")
}

//退出登陆请求
export function logout() {
    return axios.post("/admin/logout")
}

//修改密码
export function updatepassword(data) {
    return axios.post("/admin/updatepassword", data)
}
