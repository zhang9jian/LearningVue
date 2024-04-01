<template>
  <div class="manage">
    <div class="user-header">
      <el-button type="primary" @click="handleCreateUser">+新增</el-button>
      <el-form :inline="true" :model="formInline">
        <el-form-item label="请输入">
          <el-input
            v-model="formInline.keywords"
            placeholder="请输入用户名 "
            clearable
          />
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
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
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
    <div>
      <el-dialog
        v-model="dialogVisible"
        :title="action == 'add' ? '新增':'编辑'"
        width="50%"
        style="width: 500px; background-color: aliceblue"
      >
        <el-form :inline="true" :model="formUser" ref="userForm" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="name"
                ><!-- prop resetFields需要-->
                <el-input v-model="formUser.name" placeholder="请输入姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="年龄"
                prop="age"
                :rules="[
                  {
                    required: true,
                    message: '年龄必输',
                  },
                  {
                    type: 'number',
                    message: '年龄数字',
                  },
                ]"
              >
                <el-input
                  v-model.number="formUser.age"
                  placeholder="请输入年龄"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="性别"
                style="width: 150px"
                prop="sex"
                :rules="[
                  {
                    required: true,
                    message: '性别必输',
                  },
                ]"
              >
                <el-select
                  v-model="formUser.sex"
                  placeholder="请选择"
                  clearable
                >
                  <el-option label="男" :value="1"></el-option>
                  <el-option label="女" :value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="出生日期"
                prop="birth"
                :rules="[
                  {
                    required: true,
                    message: '出生日期必输',
                  },
                ]"
              >
                <el-date-picker
                  v-model="formUser.birth"
                  type="date"
                  placeholder="出生日期"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="justify-content: left">
            <el-form-item
              label="地址"
              prop="addr"
              :rules="[
                {
                  required: true,
                  message: '地址必输',
                },
              ]"
            >
              <el-input v-model="formUser.addr" placeholder="请输入地址" />
            </el-form-item>
          </el-row>
          <el-row style="justify-content: flex-end">
            <el-form-item>
              <el-button type="primary" @click="handleCancel">取消</el-button>
              <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, reactive } from "vue";
const tableData = ref([]);
const { proxy } = getCurrentInstance();
const config = reactive({
  total: 0,
  page: 1,
  name: "",
});
const formUser = reactive({
  name: "",
  age: "",
  sex: "",
  birth: "",
  addr: "",
});
const dialogVisible = ref(false);
const getUserData = async (config) => {
  let res = await proxy.$api.getUserData(config);
  config.total = res.length;
  tableData.value = res.map((item) => {
    item.sex = item.sex == 1 ? "女" : "男";
    return item;
  });
};
const changePage = (page) => {
  config.page = page;
  getUserData(config);
};
const formInline = reactive({
  keywords: "",
  user: "",
});
const handleSearch = () => {
  config.name = formInline.keywords;
  console.log("config.name", config.name);
  getUserData(config);
};
const handleClose = (done) => {
  ElMessageBox.confirm("确定关闭吗?")
    .then(() => {
      proxy.$refs.userForm.resetFields();
      done();
    })
    .catch(() => {
      // catch error
    });
};
const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
};
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: "姓名为必输项", trigger: "blur" },
    { min: 3, max: 5, message: "长度为3到5个字符", trigger: "blur" },
  ],
  age: [{ validator: checkAge, trigger: 'blur' }],
});

const handleCancel = () => {
  dialogVisible.value = false;
  proxy.$refs.userForm.resetFields();
};
const action = ref('add')
const handleEdit = (row) => {
  action.value = 'edit'
  dialogVisible.value = true;
  row.sex = row.sex=='1'?'男':'女'
  Object.assign(formUser,row)
};
const handleCreateUser = ()=>{
  action.value = 'add'
  dialogVisible.value = true;
}
const onSubmit = () => {
  proxy.$refs.userForm.validate(async (valid, fields) => {
    if (valid) {
      const res = await proxy.$api.createUser(formUser);
      if (res) {
        dialogVisible.value = false;
        proxy.$refs.userForm.resetFields();
        getUserData(config);
      }
    } else {
      ElMessage({
        showClose:true,
        message:'出错了',
        type:'error'
      })
      return;
    }
  });
};


onMounted(() => {
  getUserData(config);
});
</script>
<style scoped>
.manage {
  .table {
    position: relative;
    height: 420px;
    .pager {
      position: absolute;
      right: 0;
      bottom: -20px;
    }
  }
  .user-header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
