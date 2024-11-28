<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
//图表数组数据
const options = [{
    text: "近一个月",
    value: "month"//这的value值与后端保持一致
}, {
    text: "近一周",
    value: "week"
}, {
    text: "近24h",
    value: "hour"
},
]
//当前默认
const current = ref("week")
//点击切换
const handleChoose = (type) => {
    current.value = type
    getdata()//点击切换时，重新获取数据，并渲染
}
//API接口引入的图表数据
import { getStatistics3 } from '../api/api_index';
//当容器变化时，改变图表大小
import { useResizeObserver } from '@vueuse/core'
const el = ref(null)//el是绑定的ref,将其绑定到图表对应的div里面
useResizeObserver(el, (entries) => {
    myChart.resize()//随着页面，改变图表大小
})
//渲染图表
import * as echarts from 'echarts';
var myChart = null
onMounted(() => {
    //id为charts是定义的类名，getElementById('chart')中的id改为对应的
    var chartDom = document.getElementById('chart');
    myChart = echarts.init(chartDom);
    getdata()
})
//图表容器被销毁之后，调用 echartsInstance.dispose 销毁实
onBeforeMount(() => {
    if (myChart) echarts.dispose(myChart)
})
//获取图表数据
function getdata() {

    let option = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'bar'
            }
        ]
    };
    myChart.showLoading();//请求数据之前，显示loading
    // option && myChart.setOption(option);
    getStatistics3(current.value).then(res => {
        // console.log("res---", res)
        option.xAxis.data = res.x
        option.series[0].data = res.y
        myChart.setOption(option)
    }).finally(() => {
        myChart.hideLoading();//请求结束，隐藏loading
    })

}

</script>

<template>
    <el-card shadow="never">
        <!-- 在template中要加上 #header，否则将不会渲染这部分内容 -->
        <template #header>
            <div class="flex justify-between">
                <span class="text-sm">订单统计</span>
                <div>
                    <el-check-tag v-for="(item, index) in options" :key="index" :checked="current == item.value"
                        @click="handleChoose(item.value)" style="margin-right: 8px;">{{ item.text }}</el-check-tag>
                </div>
            </div>
        </template>
        <!-- 图表部分 -->
        <div ref="el" id="chart" style="width: 100%;height: 300px;">

        </div>
    </el-card>
</template>