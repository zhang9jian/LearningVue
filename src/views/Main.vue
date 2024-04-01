<template>
  <div class="common-layout">
    <el-container class="lay-container">
        <el-aside width="auto">
            <common-asider />
        </el-aside>

      <el-container class="el-container">
        <common-header />
        <common-tab/>
        <el-main class="right-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import CommonHeader from "../components/CommonHeader.vue";
import CommonAsider from "../components/CommonAsider.vue";
import CommonTab from "../components/CommonTab.vue";
</script>
<style lang="less" scoped>
.el-header {
  padding: 0;
} 

.el-container {
 flex-wrap: wrap; /*强制换行 */
  align-items:flex-start;
  height: 100%;
 
}
.common-layout {
  .lay-container{
    flex-wrap:nowrap;
    .right-main{
      height: calc(100%-124px);
    }
  }
  height: 100%;
  & > .el-container {
    height: 100%;
    & > .el-aside {
      height: 100%;
      background-color: #545c64;
    }
  }
}
</style>
