import axios from "../axios" // 导入自定义的 axios 实例
//
export function getStatistics1() {
    return axios.get("/admin/statistics1")
}
//图表接口
export function getStatistics3(type) {
    return axios.get("/admin/statistics3?type=" + type)
}
//店铺和交易提示组件开发和交互
export function getStatistics2(type) {
    return axios.get("/admin/statistics2")
}
