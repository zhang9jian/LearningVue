<template>
  <el-aside :width="!collapseStore.isCollapse?'115px':'50x'">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :collapse="collapseStore.isCollapse"
      :collapse-transition="false" 
    >
    <h3 v-show = "collapseStore.isCollapse">后台</h3>
    <h3 v-show = "!collapseStore.isCollapse">后台管理</h3>
    
      <el-menu-item
        :index="item.path"
        v-for="item in noChildren()"
        :key="item.path"
        @click="clickMenu(item)"
      >
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>

      <el-sub-menu
        :index="item.path"
        v-for="item in hasChildren()"
        :key="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="subItem.path"
            v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
            @click="clickMenu(subItem)"
          >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>
<script setup lang="ts">
import {useCollapseStore} from '../store'
import {useRouter} from 'vue-router'
let collapseStore = useCollapseStore()
const router =  useRouter()
const list = [
  {
    path: "/user",
    name: "user",
    label: "用户管理",
    icon: "user",
    url: "UserManage/UserManage",
  },
  {
    label: "其他",
    icon: "location",
    path: "/other",
    children: [
      {
        path: "/page1",
        name: "page1",
        label: "页面1",
        icon: "setting",
        url: "Other/PageOne",
      },
      {
        path: "/page2",
        name: "page2",
        label: "页面2",
        icon: "setting",
        url: "Other/PageTwo",
      },
    ],
  },
];
const noChildren = () => {
  return list.filter((item) => !item.children);
};

const hasChildren = () => {
  return list.filter((item) => item.children);
};

const clickMenu = (item:any)=>{
  router.push({name:item.name})
}

</script>
<style scoped>
.icons {
  width: 80px;
  height: 80px;
}
.el-menu {
  border-right: none;
  h3{
    line-height:40px;
    color:#ffff;
    text-align:center;
  }
}
</style>
