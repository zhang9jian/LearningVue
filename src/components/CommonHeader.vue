<template>
    <el-header>
        <div class="l-content">
            <el-button size="small">
                <el-icon :size="18">
                    <Menu />
                </el-icon>
            </el-button>
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
const getImgSrc = (user:string) => {
    return new URL(`../assets/images/${user}.png`, import.meta.url).href
}
</script>
<style>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.r-content {
    .user {
        width: 35px;
        height: 35px;
        border-radius: 50%;
    }
}
</style>
