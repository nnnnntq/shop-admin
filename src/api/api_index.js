import axios from "../axios" // 导入自定义的 axios 实例
//
export function getStatistics1() {
    return axios.get("/admin/statistics1")
}
//图表接口
export function getStatistics3(type) {
    return axios.get("/admin/statistics3?type=" + type)
}
