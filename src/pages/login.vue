<script setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
// impo rt { UserFilled, Lock } from '@element-plus/icons-vue'//引入UserFilled和Lock图标
import { login, getinfo } from '../api/manager' //引入/api/manager中的login方法，用于在登陆页面调用登陆的axios请求
// import { ElNotification } from 'element-plus'//引入消息通知方法
import { toast } from '../composables/util';//引用封装的在util.js中的toast方法
import { useRouter } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies'//引入useCookies
import { useStore } from 'vuex';
// import { setToken } from '../composables/auth';//引用封装的cookie中的settoken方法

const store = useStore()
const router = useRouter()



//表单验证规则
const form = reactive({
    username: '',
    password: ""
})
const rules = {
    username: [
        {
            required: true,//必填
            message: '用户名不能为空',
            trigger: 'blur'//失去焦点时触发
        },
    ],
    password: [
        {
            required: true,//必填
            message: '密码不能为空',
            trigger: 'blur'//失去焦点时触发
        },
    ],

}

//表单输入提交、登陆设置
const formref = ref(null)
const loading = ref(false)//登陆按钮加载中状态设置
const onSubmit = () => {
    formref.value.validate((valid) => {
        // console.log(valid)
        if (!valid) {
            return false
        }
        loading.value = true//登陆按钮状态不可点击
        // console.log("验证通过");
        // console.log("valid", valid);
        login(form.username, form.password)
            .then(res => {
                // console.log("res:", res);
                console.log("res:", res);
                //提示登陆成功               
                // ElNotification({
                //     message: "登陆成功",
                //     type: 'success',
                //     duration: 3000,
                // })
                toast("登陆成功")

                //跳转至首页
                router.push("/")

                //存储token到cookie中
                const cookie = useCookies()//用cookie接收useCookies
                cookie.set("admin-token", res.token)
                // setToken(res.token)

                //获取用户相关信息
                // getinfo().then(res2 => {
                //     store.commit("SET_USERINFO", res2)
                //     console.log("res2:", res2);
                // })

            })
            .finally(() => {
                loading.value = false
            })
    })
}

//监听回车事件
function onKeyUp(e) {
    // console.log("e", e);
    //// 键盘e.key为enter即回车键时，执行onsubmit函数
    if (e.key == "Enter") onSubmit()
}

//添加键盘事件监听 
//通过键盘回车执行登陆操作
onMounted(() => {
    document.addEventListener("keyup", onKeyUp)
})
onBeforeMount(() => {
    document.removeEventListener("keyup", onKeyUp)
})



</script>

<template>
    <el-row class="login-container">
        <el-col :lg="16" :md="12" class="left">
            <div>
                <div>欢迎光临</div>
                <div>这是登陆页面</div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right">
            <h2 class="title">欢迎回来</h2>
            <div>
                <span>账号密码登录</span>
            </div>
            <el-form ref="formref" :rules="rules" :model="form" class="w-[250px]">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon>
                                <UserFilled />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" type="password" show-password placeholder="请输入密码">
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button round color="rgb(100 102 241)" class="w-[250px]" type="primary" @click="onSubmit"
                        :loading="loading">
                        登陆
                    </el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style scoped>
.login-container {
    @apply min-h-screen bg-indigo-500;
}

.login-container .left,
.login-container .right {
    @apply flex items-center justify-center flex-col;
}

.login-container .right {
    @apply bg-light-50;
}

.left>div>div:first-child {
    @apply font-bold text-5xl text-light-100 mb-4;
}

.left>div>div:last-child {
    @apply text-gray-100;
}

.title {
    @apply font-bold text-3xl text-gray-700;
}

.right>div {
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
</style>