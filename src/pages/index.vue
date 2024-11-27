<script setup>
import { ref, reactive } from "vue"
import { useCookies } from '@vueuse/integrations/useCookies'//引入useCookies
const cookie = useCookies()//用cookie接收useCookies

//引入后台主页统计面板数据
import { getStatistics1 } from "../api/api_index";
const panels = ref([])
getStatistics1()
    .then(res => {
        panels.value = res.panels
        console.log(" panels.value", panels.value)
    })
//数字动画效果，引入子组件
import CountTo from "../components/CountTo.vue";
//引入分类组件indexNavs.vue
import IndexNavs from "../components/IndexNavs.vue";
//引入图表
import indexChart from "../components/indexChart.vue";
</script>


<template>
    <div>
        <!-- 后台首页 -->
        <el-row :gutter="20"> <!-- :gutter="20" 表示设置行内所有列的间距为 20 像素 -->
            <!-- 骨架屏优化体验 -->
            <template v-if="panels.length == 0">
                <el-col :span="6" v-for="i in 4" :key="i">
                    <el-skeleton style="width: 100%" animated loading>
                        <template #template>
                            <el-card shadow="hover" class="border-0">
                                <template #header>
                                    <div class="flex justify-between">
                                        <el-skeleton-item variant="p" style="width: 50%" />
                                        <el-skeleton-item variant="p" style="width: 18%" />
                                    </div>
                                </template>
                                <el-skeleton-item variant="h3" style="width: 70%" />
                                <el-divider />
                                <div class="flex justify-between text-sm text-gray-500">
                                    <el-skeleton-item variant="p" style="width: 50%" />
                                    <el-skeleton-item variant="p" style="width: 15%" />
                                </div>
                            </el-card>
                        </template>
                    </el-skeleton>
                </el-col>
            </template>

            <el-col :span="6" :offset="0" v-for="(item, index) in panels" :key="index">
                <el-card shadow="hover" class="border-0">
                    <template #header>
                        <div class="flex justify-between">
                            <span class="text-sm">{{ item.title }}</span>
                            <el-tag :type="item.unitColor" effect="plain">
                                {{ item.unit }}
                            </el-tag>
                        </div>
                    </template>
                    <span class="text-3xl font-bold text-gray-500">
                        <!-- {{ item.value }} -->
                        <CountTo :value="item.value" />
                    </span>
                    <el-divider />
                    <div class="flex justify-between text-sm text-gray-500">
                        <span>{{ item.subTitle }}</span>
                        <span>{{ item.subValue }}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <IndexNavs />

        <!-- echart图表 -->
        <el-row :gutter="20" class="mt-5">
            <el-col :span="12" :offset="0">
                <indexChart />
            </el-col>
            <el-col :span="12" :offset="0"></el-col>
        </el-row>

    </div>
</template>
