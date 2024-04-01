<template>
  <div class="tags">
    <el-tag
      type="primary"
      v-for="(tag, index) in tagLists"
      :key="tag.name"
      :closable="tag.name != 'home'"
      :disable-transitions = false
      :effect="$route.name==tag.name?'dark':'plain'"
      @click="changeMenu(tag)"
      @close="handleCloseTab(tag, index)"
      >{{tag.label}}</el-tag
    >
  </div>
</template>

<script setup ts="lang">
import { useRouter,useRoute } from "vue-router";
import { useCollapseStore } from "../store";

let collapseStore = useCollapseStore();
let router = useRouter();
let route = useRoute();
const tagLists = collapseStore.tabsList;
const changeMenu =(item)=>{
    router.push({name:item.name});
}

const handleCloseTab = (tag,index)=>{   
    collapseStore.closeTab(tag);
    console.log('tagLists',tagLists)
    //关闭的tab不是当前tab
    if (tag.name != route.name){
        console.log('非当前tab',index)
        return;
    }
    //关闭的tab是当前tab
    let maxIdx = tagLists.length;
    console.log('index is : ',index,'  maxIdx is : ',maxIdx)
    if(index == maxIdx){//最后一个tab
        console.log('当前最后tab',index)
        router.push({name:tagLists[index-1].name})
    }else{//非末尾tab
        console.log('当前非最后tab',index)
        router.push({name:tagLists[index].name})
    }

}
</script>

<style scoped>
.tags{
    padding:20px;
    width:100%;
    .el-tag{
        margin-right: 15px;
        cursor:pointer; 
    }
}
</style>
