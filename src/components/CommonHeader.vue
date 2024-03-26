<template>
    <el-header>
        <div class="l-content">
            <el-button size="small" plain @click="handleCollapse()">
                <el-icon :size="18">
                    <Menu />
                </el-icon>
            </el-button>
            <h3>首页</h3>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="user" :src="getImgSrc('user')">
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>
<script setup lang="ts">
import {useStore} from 'vuex'
let store = useStore()
const getImgSrc = (user:string) => {
    return new URL(`../assets/images/${user}.png`, import.meta.url).href
}
let handleCollapse = ()=>{
    //调用mutations：
    store.commit("updateIsCollapse")
}
</script>
<style>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color:#333
}
.l-content{
    display:flex;
    align-items:center;
    .el-button{
        margin-right:20px;
    }
    h3{
        color:#fff
    }
}
.r-content {
    .user {
        width: 35px;
        height: 35px;
        border-radius: 50%;
    }
}
</style>
