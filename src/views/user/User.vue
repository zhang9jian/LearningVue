<template>
  <div class="user-header">
    <el-button type="primary" @click="dialogVisible = true">+新增</el-button>
    <el-form :inline="true" :model="formInline" >
      <el-form-item label="请输入">
        <el-input v-model="formInline.keywords" placeholder="请输入用户名 " clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
  </el-form>
  </div>
  <div class="table" style="margin-top: 1px">
    <el-table stripe height="400px" :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="birth" label="出生日期"> </el-table-column>
      <el-table-column prop="addr" label="地址"> </el-table-column>
      <el-table-column prop="addr" fiexed label="操作">
        <template #default>
          <el-button size="small" @click="handleEdit()">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete()"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="config.total"
      class="pager"
      @current-change="changePage"
    />
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="新增用户"
    width="500"
    :before-close="handleClose"
  >
  <el-form :inline="true" :model="formUser" >
    <el-form-item label="姓名">
      <el-input v-model="formUser.name " placeholder="Approved by" clearable />
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select
        v-model="formInline.region"
        placeholder="Activity zone"
        clearable
      >
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time">
      <el-date-picker
        v-model="formInline.date"
        type="date"
        placeholder="Pick a date"
        clearable
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Query</el-button>
    </el-form-item>
  </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted, getCurrentInstance,reactive } from "vue";
const tableData = ref([]);
const { proxy } = getCurrentInstance();
const config = reactive({
    total:0,
    page:1,
    name:'',
})
const dialogVisible = ref(false)
const getUserData = async (config) => {
  let res = await proxy.$api.getUserData(config);
  config.total = res.length;
  tableData.value = res.map((item) => {
    item.sex = item.sex == 1 ? "女" : "男";
    return item;
  });
};
const changePage = (page)=>{
    config.page = page
    getUserData(config)
}
const formInline = reactive({
  keywords:'',
  user:''
})
const handleSearch = ()=>{
  config.name = formInline.keywords;
  console.log('config.name',config.name)
  getUserData(config);
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
const formUser = reactive({
  name:"",
})
onMounted(() => {
  getUserData(config);
});
</script>
<style scoped>
  .table{
    position: relative;
    height: 420px;
    .pager{
      position: absolute;
      right:0;
      bottom: -20px;
    }
  }
  .user-header{
    display: flex;
    justify-content: space-between;
  }

</style>