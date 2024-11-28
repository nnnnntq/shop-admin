<script setup>
import { ref, reactive } from "vue"
import { useCookies } from '@vueuse/integrations/useCookies'//引入useCookies
const cookie = useCookies()//用cookie接收useCookies

//引入后台主页统计面板数据，卡片数据
import { getStatistics1, getStatistics2 } from "../api/api_index";
const panels = ref([])
getStatistics1()
    .then(res => {
        panels.value = res.panels
        // console.log(" panels.value", panels.value)
    })
const goods = ref([])
const order = ref([])
getStatistics2().then(res => {
    console.log("getStatistics2", res)
    goods.value = res.goods
    console.log("goods", goods)
    order.value = res.order
})
//数字动画效果，引入子组件
import CountTo from "../components/CountTo.vue";
//引入分类组件indexNavs.vue
import IndexNavs from "../components/IndexNavs.vue";
//引入图表
import indexChart from "../components/indexChart.vue";
//引入子组件
import indexCard from "../components/indexCard.vue"
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
            <el-col :span="12" :offset="0">
                <indexCard title="店铺及商品展示" tip="店铺及商品展示" :cardData="goods" class="mb-3" />
                <indexCard title="交易提示" tip="需处理的交易订单" :cardData="order" />
            </el-col>
        </el-row>

    </div>
</template>
