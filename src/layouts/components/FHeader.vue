<script setup>
// import store from '../../store';
// console.log("user", store.state.user.avatar)//用户头像

//退出登陆功能
import { logout } from '../../api/manager';//粘贴时注意引入到路径变化
import { showModal, toast } from '../../composables/util';
import { useRouter } from "vue-router"
import { useStore } from "vuex";
const router = useRouter()
const store = useStore()
function handlelogout() {
    showModal("是否要退出登陆？")
        //点击确认时执行.then
        .then(res => {
            // console.log("退出登陆")
            //退出登陆请求
            logout()
                .finally(() => {
                    //移除cookie里的token
                    //清除当前用户状态vuex
                    store.dispatch("logout")
                    //跳转至登陆页
                    router.push("/login")
                    //提示退出登陆成功
                    toast("退出登陆成功")
                })
        })
}

//下拉菜单事件
const handleCommand = (c) => {
    // console.log(c)
    switch (c) {
        case "logout":
            handlelogout()
            break;
        case "rePassword":
            // console.log("修改密码")
            // drawer.value = true//直接使用弹窗时
            formDrawerRef.value.open()//调用FormDrawer.vue中的方法来打开弹窗
            break;
    }
}

//刷新事件
const handleReflesh = () => location.reload()
//全屏
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, enter, exit, toggle } = useFullscreen()

//抽屉组件-修改密码部分
import { ref, reactive } from 'vue'
const drawer = ref(false)
const formDrawerRef = ref(null)//封装的弹窗使用
//表单验证规则
const form = reactive({
    oldpassword: "",
    password: "",
    repassword: "",
})
const rules = {
    oldpassword: [
        {
            required: true,//必填
            message: '旧密码不能为空',
            trigger: 'blur'//失去焦点时触发
        },
    ],
    password: [
        {
            required: true,//必填
            message: '新密码不能为空',
            trigger: 'blur'//失去焦点时触发
        },
    ],
    repassword: [
        {
            required: true,//必填
            message: '确认密码不能为空',
            trigger: 'blur'//失去焦点时触发
        },
    ],

}
//表单输入提交、登陆设置
const formref = ref(null)
// const loading = ref(false)//登陆按钮加载中状态设置
const onSubmit = () => {
    formref.value.validate((valid) => {
        // console.log(valid)
        if (!valid) {
            return false
        }
        // loading.value = true//登陆按钮状态不可点击
        formDrawerRef.value.showloading()
        updatepassword(form)
            .then(res => {
                toast("修改密码成功，请重新登录")
                //清除当前用户状态vuex
                store.dispatch("logout")
                //跳转至登陆页
                router.push("/login")
                //提示退出登陆成功
                // toast("退出登陆成功")
            })
            .finally(() => {
                // loading.value = false
                formDrawerRef.value.hideloading()

            })
    })
}
//引入updatepassword函数
import { updatepassword } from '../../api/manager';

//用封装的弹窗组件
import FormDrawer from '../../components/FormDrawer.vue';
</script>

<template>
    <div class="f-header">
        <span class="logo">
            <el-icon class="mr-2">
                <HelpFilled />
            </el-icon>我的页面
        </span>
        <el-tooltip content="折叠">
            <el-icon class="icon-btn" @click="$store.commit('handleAsideWith')">
                <fold v-if="store.state.asideWith == '250px'" />
                <Expand v-else />
            </el-icon>
        </el-tooltip>
        <el-tooltip content="刷新">
            <el-icon class="icon-btn" @click="handleReflesh">
                <RefreshRight />
            </el-icon>
        </el-tooltip>

        <div class="ml-auto flex items-center">
            <!-- 全屏切换 -->
            <el-tooltip content="全屏">
                <el-icon class="icon-btn" @click="toggle">
                    <FullScreen v-if="!isFullscreen" />
                    <Aim v-else="isFullscreen" />
                </el-icon>
            </el-tooltip>
            <!-- 下拉菜单 -->
            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex justify-center items-center text-light-50">
                    <el-avatar class="mr-2" :size="25" :src="store.state.user.avatar" />
                    {{ store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登陆</el-dropdown-item>

                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

    </div>

    <!-- 抽屉组件(直接使用) -->
    <!-- <el-drawer v-model="drawer" title="修改密码" size="45%" :close-on-click-modal="false">
        <el-form ref="formref" :rules="rules" :model="form" label-width="80px">
            <el-form-item prop="oldpassword" label="旧密码">
                <el-input v-model="form.oldpassword" placeholder="请输入旧密码">
                </el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
                <el-input v-model="form.password" type="password" show-password placeholder="请输入新密码">
                </el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
                <el-input v-model="form.repassword" type="password" show-password placeholder="请确认密码">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="loading">
                    提交
                </el-button>
            </el-form-item>
        </el-form>
    </el-drawer> -->

    <!-- 使用封装的弹窗组件 -->
    <form-drawer ref="formDrawerRef" title="修改密码" destroyonclose @submit="onSubmit">
        <el-form ref="formref" :rules="rules" :model="form" label-width="80px">
            <el-form-item prop="oldpassword" label="旧密码">
                <el-input v-model="form.oldpassword" placeholder="请输入旧密码">
                </el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
                <el-input v-model="form.password" type="password" show-password placeholder="请输入新密码">
                </el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
                <el-input v-model="form.repassword" type="password" show-password placeholder="请确认密码">
                </el-input>
            </el-form-item>
        </el-form>
    </form-drawer>

</template>

<style>
.f-header {
    @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
    height: 64px;
    z-index: 10;
}

.logo {
    width: 250px;
    @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    /* 鼠标指到时变为手指标 */
    cursor: pointer;
}

.icon-btn:hover {
    @apply bg-indigo-600
}

.f-header .dropdown {
    cursor: pointer;
    height: 64px;
    @apply flex justify-center items-center mx-5;
}
</style>