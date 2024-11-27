<template>
    <div class="f-taglist" :style="{ left: $store.state.asideWith }">
        <!-- 标签导航栏 -->
        <el-tabs v-model="activeTab" type="card" class="flex-1 " @tab-remove="removeTab" style="min-width: 100px;"
            @tab-change="changeTab">
            <el-tab-pane :closable="item.path != '/'" v-for="item in tabList" :key="item.path" :label="item.title"
                :name="item.path">
            </el-tab-pane>
        </el-tabs>

        <!-- 下拉菜单 -->
        <span class="tag-btn">
            <el-dropdown @command="handleClose">
                <span class="el-dropdown-link">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="clearOther"> 关闭其他</el-dropdown-item>
                        <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
    <!-- 为标签行增加一个占位符，防止页面内容被上方的标签导航遮住 -->
    <div style="height: 44px;"></div>
</template>



<script setup>
import { styleType } from 'element-plus/es/components/table-v2/src/common.mjs';
import { ref } from 'vue'

//刷新页面时，自动选中当前页面路径
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
const route = useRoute()

const activeTab = ref(route.path)//选中的状态
const tabList = ref([
    {
        title: '后台首页',
        path: "/",
    },
])
//同步路由和储存
onBeforeRouteUpdate((to, from) => {
    // console.log("to,from", to, from)
    //     console.log("to,from", {
    //         title: to.meta.title,
    //         path: to.path
    // })
    activeTab.value = to.path//当前激活状态
    addTab({
        title: to.meta.title,
        path: to.path
    })
})

//添加标签导航
import { useCookies } from '@vueuse/integrations/useCookies'//引入useCookies
const cookie = useCookies()
function addTab(tab) {
    let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1
    if (noTab) {
        tabList.value.push(tab)//添加新的标签导航
    }
    cookie.set("tabList", tabList.value)
}
//初始化标签导航（因为刷新时只剩下默认的tabList），从cookie中取值
function initTabList() {
    let tbs = cookie.get("tabList")
    if (tbs) {
        tabList.value = tbs
    }
}
initTabList()//执行该函数
//点击标签，能够跳转至对应路径
import { useRouter } from 'vue-router'
const router = useRouter() // 引入路由实例 
const changeTab = (t) => {
    // console.log("t---", t)//点击标签拿到的t是对应的路径值
    activeTab.value = t//标签激活状态的对应
    router.push(t)//路由跳转至对应路径
}
//关闭时，从标签导航中删除对应标签
const removeTab = (t) => {
    // console.log("t---", t)//得到接收的参数t是对应路径
    let tabs = tabList.value
    let a = activeTab.value
    if (a == t) {//叉叉的标签和当前激活的标签一致时
        tabs.forEach((tab, index) => {
            if (tab.path == t) {
                const nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                    a = nextTab.path
                }
            }
        })
    }
    activeTab.value = a//标签激活状态的对应
    router.push(a)//路由跳转至对应路径
    tabList.value = tabList.value.filter(tab => tab.path != t)//使用filter过滤，只留下没有被叉叉选中的标签
    cookie.set("tabList", tabList.value)//更新cookie中存储的tablist值
}
//下拉菜单
const handleClose = (c) => {
    // console.log("c----", c)//获取的是el-dropdown-item中定义的command的值"clearQther"
    if (c == "clearAll") {
        activeTab.value = "/"//切换回首页
        router.push('/')
        tabList.value = [{ title: '后台首页', path: "/", },]
    }
    else if (c == "clearOther") {
        //使用filter过滤，只留下首页和当前激活的标签页
        tabList.value = tabList.value.filter(tab => tab.path == "/" || tab.path == activeTab.value)
    }
    cookie.set("tabList", tabList.value)//更新cookie中存储的tablist值
}

</script>

<style scoped>
.f-taglist {
    @apply bg-gray-100;
    display: flex;
    justify-items: center;
    position: fixed;
    top: 64px;
    right: 0;
    height: 44px;
    z-index: 10;
}

.tag-btn {
    @apply bg-white rounded ml-auto;
    margin-top: 5px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    width: 32px;
}

:deep(.el-tabs__header) {
    margin-bottom: 0;
    /* 如果使用deep和!important没有生效，检查是否有在style中加上scoped */
}

:deep(.el-tabs__nav) {
    border: 0 !important;
}

:deep(.el-tabs--card>.el-tabs__header) {
    border-bottom: 0;
}

:deep(.el-tabs__item) {
    background-color: white;
    border: 0;
    height: 32px;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    line-height: 32px;
    border-radius: 10px;
}

:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
    line-height: 32px;
    height: 32px;
}
</style>