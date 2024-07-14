<script setup lang="ts">
import { onMounted,watch,ref } from "vue";
import store from "@/store/store";
import Line from '@/components/echarts/components/line.vue'
import Pie from '@/components/echarts/components/pie.vue'
import Radar from '@/components/echarts/components/radar.vue'

onMounted(() => {
});

</script>

<template>
    <div id="leftContainer">
        <Line></Line>
        <Pie></Pie>
        <Radar></Radar>
    </div>
</template>

<style scoped>
#leftContainer {
    width:380px;
    height:85%;
    background:rgba(29, 60, 78, 0.5);
    position:absolute;
    left:0;
    top: 150px;
    z-index:10;
    text-align:center;
    font-size:40px;
    color:white;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;

}
</style>