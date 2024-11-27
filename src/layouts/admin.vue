<script setup>
import FHeader from './components/FHeader.vue';
import FMenu from './components/FMenu.vue';
import FTagList from './components/FTagList.vue';
</script>

<template>
    <el-container>
        <el-header>
            <f-header />
        </el-header>
        <el-container>
            <el-aside :width="$store.state.asideWith">
                <f-menu />
            </el-aside>
            <el-main>
                <f-tag-list />
                <!-- keep-alive缓存 -->
                <router-view v-slot="{ Component }">
                    <!-- 过度动画transition -->
                    <transition name="fade">
                        <keep-alive :max="10">
                            <component :is="Component"></component>
                        </keep-alive>
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<style>
.el-aside {
    transition: all 0.2s;
}

.fade-enter-from {
    /* 透明度 */
    /* opacity: 0; */
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
}

.fade-enter-to {
    /* opacity: 1; */
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}

.fade-leave-from {
    /* opacity: 0; */
    opacity: 1;
}

.fade-leave-to {
    /* opacity: 1; */
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}

.fade-enter-active {
    transition-delay: 0.3s;
}
</style>
