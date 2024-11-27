//index.js
import { createStore } from "vuex"
import { getinfo } from "../api/manager"
import { setToken, removeToken } from "../composables/auth"
// 创建一个新的 store 实例
const store = createStore({
    //state 用于保存应用中的数据，这些数据可以被 Vue 组件访问和修改
    state() {
        return {
            //用户信息
            user: {},

            //侧边宽度
            asideWith: "250px",

            //getinfo菜单数据
            menus: [],
            ruleNames: []
        }
    },
    //mutations 是用来同步修改state的唯一方式。它们是Vuex中同步的数据变更方法，通常你会在这里定义用于修改状态的逻辑。
    mutations: {
        //记录用户信息
        SET_USERINFO(state, user) {
            state.user = user
        },
        //展开/缩起侧边
        handleAsideWith(state) {
            state.asideWith = state.asideWith == "250px" ? "64px" : "250px"
        },
        //修改getinfo菜单数据
        SET_MENUS(state, menus) {
            state.menus = menus
        },
        STE_RULENAMES(state, ruleNames) {
            state.ruleNames = ruleNames
        }
    },
    //Actions：用于处理异步操作，异步操作完成后通过 commit 调用 mutations 更新 state。通过 dispatch 调用
    actions: {
        //获取当前用户登陆信息
        getinfo({ commit }) {
            return new Promise((resolve, reject) => {
                getinfo()
                    .then((res) => {
                        commit("SET_USERINFO", res)
                        // console.log("loginfo-res", res)
                        commit("SET_MENUS", res.menus)
                        console.log("loginfo-res.menus", res.menus)

                        commit("STE_RULENAMES", res.ruleNames)
                        resolve(res)
                    })
                    .catch((err) => reject(err))
            })
        },

        //退出登陆
        logout({ commit }) {
            //清除cookie里的token
            removeToken()
            //清除当前用户状态
            commit("SET_USERINFO", {})
        }
    }
})

export default store
