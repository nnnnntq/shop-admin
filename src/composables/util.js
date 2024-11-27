//util.js
//封装消息提示
import { ElNotification, ElMessage, ElMessageBox } from "element-plus" //引入消息通知方法
//消息提示
export function toast(
    message,
    type = "success",
    dangerouslyUseHTMLString = false
) {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 3000
    })
}
//消息通知封装
export function showModal(content = "提示内容", type = "warning", title = "") {
    return ElMessageBox.confirm(content, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type
    })
}

//全局loading进度条实现
import nprogress from "nprogress"
//显示全屏loading
export function showFUllLoading() {
    nprogress.start()
}
//隐藏全屏loading
export function hideFUllLoading() {
    nprogress.done()
}
