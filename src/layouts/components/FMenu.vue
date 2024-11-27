<script setup>
//菜单
// const asideMenus = [{
//     "name": "后台面板",
//     "icon": "help",
//     "child": [{
//         "name": "主控台",
//         "frontpath": "/",
//         "icon": "home-filled",
//     }],
// },
// {
//     "name": "商城管理",
//     "icon": "shopping-bag",
//     "child": [{
//         "name": "商品管理",
//         "frontpath": "/goods/list",
//         "icon": "shopping-cart-full",
//     }]
// },]
//从getinpg中获取menus
const asideMenus = computed(() => store.state.menus)

//点击跳转至对应页面
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const handleSelect = (e) => {
    // console.log("e", e)//通过控制台能发现，拿到的参数是对应的路径，因此可以直接跳转
    router.push(e)
}
//折叠侧边栏
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore()
const isCollapse = computed(() => !(store.state.asideWith == "250px"))
//菜单选中与路由关联
const route = useRoute()
const defaultActive = ref(route.path)
// console.log("store.state.menus", store.state.menus)
// console.log("store.state.user", store.state.user)
// console.log("store.state.ruleNames", store.state.ruleNames)

</script>


<template>
    <div class="f-menu" :style="{ width: $store.state.asideWith }">
        <el-menu :default-active="defaultActive" :collapse="isCollapse" :collapse-transition="false" unique-opened
            default-active="2" class="border-0" @select="handleSelect">

            <template v-for="(item, index) in asideMenus" :key="index">

                <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath">
                        <el-icon>
                            <component :is="item2.icon"></component>
                        </el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>
                </el-sub-menu>

                <el-menu-item v-else :index="item.frontpath">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>

            </template>
        </el-menu>
    </div>
</template>

<style>
.f-menu {
    /* 展开与折叠侧边栏的动画效果 */
    transition: all 0.2s;
    /* width: 250px; */
    position: fixed;
    top: 64px;
    left: 0;
    bottom: 0;
    /* 超出是滚动 */
    overflow: auto;
    @apply shadow bg-light-50;

}
</style>