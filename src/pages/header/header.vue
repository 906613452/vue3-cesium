<script setup lang="ts">
import { onMounted,watch,ref } from "vue";
import store from "@/store/store";


onMounted(() => {
});

</script>

<template>
    <div class="header">
        智慧农业结构化平台
    </div>
</template>

<style scoped>
.header {
    width:100vw;
    height:130px;
    line-height:130px;
    background:rgba(29, 60, 78,0.8);
    position:absolute;
    top:0;
    z-index:10;
    text-align:center;
    font-size:40px;
    color:white;
}
</style>