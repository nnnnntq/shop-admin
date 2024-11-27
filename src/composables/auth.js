//auth.js
//常用工具库封装

//封装cookie
import { useCookies } from '@vueuse/integrations/useCookies'//引入useCookies
const TokenKey = "admin-token"
const cookie = useCookies()

//获取token
export function getToken(){
    return cookie.get(TokenKey)
}
//设置token
export function setToken(){
    return cookie.set(TokenKey)
}
//清除token
export function removeToken(){
    return cookie.remove(TokenKey)
}