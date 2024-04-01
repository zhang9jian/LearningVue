<template>
  <el-header>
    <div class="l-content">
      <el-button size="small" plain @click="handleCollapse()">
        <el-icon :size="18">
          <Menu />
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: current.path }" v-if="current">{{
          current.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" :src="getImgSrc('user')" />
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
import { computed } from "vue";
import { useCollapseStore } from "../store";
let collapseStore = useCollapseStore();
const getImgSrc = (user: string) => {
  return new URL(`../assets/images/${user}.png`, import.meta.url).href;
};
let handleCollapse = () => {
  //调用mutations：
  collapseStore.updateCollapse();
};

const current = computed(() => {
  console.log("collapseStore.currentMenu", collapseStore.currentMenu);
  return collapseStore.currentMenu;
});
</script>
<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #333;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 10px;
    margin-left: 10px;
  }
  h3 {
    color: #fff;
  }
 .bread span {
 /* 放外边 deep不生效 */
    color: #fff !important;
    cursor:pointer !important; /*链接显示小手 */
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
