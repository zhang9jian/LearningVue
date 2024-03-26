<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-container class="r-container">
                <common-header/>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup lang="ts">
import CommonHeader from '../components/CommonHeader.vue';

</script>
<style scoped>
.el-header {
    padding: 0
}
.r-container{
    flex-wrap: wrap;
}
</style>