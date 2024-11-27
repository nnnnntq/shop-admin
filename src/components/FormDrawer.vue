<script setup>
import { ref, reactive } from 'vue'
const drawer = ref(false)
//打开
const open = () => drawer.value = true
//关闭
const close = () => drawer.value = false
//提交
const emit = defineEmits(["submit"])
const submit = () => emit("submit")

//提交按钮的加载状态
const loading = ref(false)
const showloading = () => loading.value = true
const hideloading = () => loading.value = false
//向父组件暴露方法
defineExpose({
    open,
    close,
    showloading,
    hideloading
})
//声明组件的 props
const props = defineProps({
    title: String,
    size: {
        type: String,
        default: "45%"
    },
    destroyonclose: {
        type: Boolean,
        default: false,
    },
    comformtext: {
        type: String,
        default: "提交",
    }
})
</script>

<template>
    <el-drawer v-model="drawer" :title="title" :size="size" :close-on-click-modal="false"
        :destroy-on-close="destroyonclose">
        <div class="formDrawer">

            <div class="body">
                <slot></slot>
            </div>
            <div class="action">
                <el-button type="primary" @click="submit" :loading="loading">{{ comformtext }}</el-button>
                <el-button type="default" @click="close">取消</el-button>

            </div>
        </div>
    </el-drawer>
</template>

<style>
.formDrawer {
    width: 100%;
    height: 100%;
    position: relative;
    /* background-color: aqua; */
    display: flex;
    flex-direction: column;
}

.formDrawer .body {
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
}

.formDrawer .action {
    height: 50px;
    @apply mt-auto flex items-center;
}
</style>