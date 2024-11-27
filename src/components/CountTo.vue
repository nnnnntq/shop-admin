<script setup>
//动态数字效果
import gsap from 'gsap';
import { reactive, watch } from 'vue';
const d = reactive({ num: 0 })
const props = defineProps({
    value: {
        type: Number,
        default: 0
    }
})
function AnimateToValue() {
    gsap.to(d, {
        duration: 0.5,
        num: props.value
    })
}
AnimateToValue()
watch(() => props.value, () => AnimateToValue())
</script>

<template>
{{ d.num.toFixed(0) }}
</template>