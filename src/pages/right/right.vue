<script setup lang="ts">
import { onMounted,watch,ref } from "vue";
import store from "@/store/store";
import Pie from '@/components/echarts/components/pie.vue'
import Cloud from '@/components/echarts/components/cloud.vue'


onMounted(() => {
});

</script>

<template>
    <div id="rightContainer">
        <Pie></Pie>
        <Cloud></Cloud>
        <Pie></Pie>
    </div>
</template>

<style scoped>
#rightContainer {
    width:380px;
    height:85%;
    background:rgba(29, 60, 78, 0.5);
    position:absolute;
    right:0;
    top: 150px;
    z-index:10;
    text-align:center;
    font-size:40px;
    color:white;
    display: flex;
    flex-direction: column;
    align-items: center;

}
</style>