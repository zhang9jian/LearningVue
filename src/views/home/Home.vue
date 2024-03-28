<template>
  <el-row class="home" :gutter="20">
    <!-- 左列  -->
    <el-col :span="8" style="padding-right: 10px">
      <el-card shadow="hover">
        <div class="user">
          <img src="../../assets/images/user.png" alt="" />
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="role">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间：<span>20240328</span></p>
          <p>上次登陆地点：<span>北京</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 322px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 右列 -->
    <el-col :span="16" style="padding-left: 10px">
      <!-- 订单统计 -->
      <div class="num">
        <el-card
          v-for="item in orderData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <component
            class="icons"
            :is="item.icon"
            :style="{ background: item.color }"
          >
          </component>
          <div class="details">
            <p class="price">${{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 折线图 -->
      <el-card style="height: 280px">
        <div ref="echarts1" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <el-card style="height: 260px">
          <div ref="echarts3" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue";
import * as echarts from "echarts";
// import axios from "axios";
const tableLabel = {
  name: "课程",
  todayBuy: "今日购买",
  monthBuy: "本月购买",
  totalBuy: "总购买",
};
let tableData = ref([]);
let orderData = ref([]);
const { proxy } = getCurrentInstance();
const getTableList = async () => {
  // await axios.get("/home/getData").then((res) => {
  //   if (res.data.code == 200) {
  //     tableData.value = res.data.data.tableData;
  //   }
  // });
  let res = await proxy.$api.getTableData();
  tableData.value = res.tableData;
};
const getOrderList = async () => {
  // await axios.get("/home/getData").then((res) => {
  //   if (res.data.code == 200) {
  //     tableData.value = res.data.data.tableData;
  //   }
  // });
  let res = await proxy.$api.getOrderData();
  orderData.value = res;
};

const getChartData = async () => {
  let result = await proxy.$api.getChartData();
  const echarts1 = echarts.init(proxy.$refs.echarts1);
  // 指定图表的配置项和数据
  var echarts1Option = {};
  // 处理数据xAxis
  const { orderData, userData, videoData } = result;
  const xAxis = Object.keys(orderData.data[0]);
  const xAxisData = {
    data: xAxis,
  };
  echarts1Option.xAxis = xAxisData;
  echarts1Option.yAxis = {};
  echarts1Option.legend = xAxisData;
  echarts1Option.series = [];
  echarts1Option.tooltip={trigger: 'axis'};

  xAxis.forEach((key) => {
    echarts1Option.series.push({
      name: key,
      data: orderData.data.map((item) => item[key]), //通过变量访问对象属性时用[],item.key 尝试访问对象 item 上名为 key 的属性
      type: "line",
    });
  });
  // 使用刚指定的配置项和数据显示图表。
  echarts1.setOption(echarts1Option);

  const echarts2 = echarts.init(proxy.$refs.echarts2);
  const eachrts2Option = {
    legend: {
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
    },
    grid: {
      left: "20%",
    },
    // 提示框
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category", // 类目轴
      data: userData.map((item) => item.date),
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
      axisLabel: {
        interval: 0,
        color: "#333",
      },
    },
    yAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
      },
    ],
    color: ["#2ec7c9", "#b6a2de"],
    series: [
      {
        name: "新增用户",
        data: userData.map((item) => item.new),
        type: "bar",
      },
      {
        name: "活跃用户",
        data: userData.map((item) => item.active),
        type: "bar",
      },
    ],
  };
  echarts2.setOption(eachrts2Option);

  // 饼状图
  const echarts3 = echarts.init(proxy.$refs.echarts3);
  const eachrts3Option = {
    tooltip: {
      trigger: "item",
    },
    color: [
      "#0f78f4",
      "#dd536b",
      "#9462e5",
      "#a6a6a6",
      "#e1bb22",
      "#39c362",
      "#3ed1cf",
    ],
    series: [
      {
        data: videoData,
        type: "pie",
      },
    ],
  };
  echarts3.setOption(eachrts3Option);
};

onMounted(() => {
  getTableList();
  getOrderList();
  getChartData();
});
</script>

<style scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  .login-info {
    p {
      line-height: 20px;
      font-size: 10px;
      color: #999;
      span {
        color: #666;
        margin-left: 5px;
      }
    }
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 10px;
    }
    .icons {
      width: 60px;
      height: 60px;
      font-size: 20px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .details {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .price {
        font-size: 20px;
        margin-bottom: 10px;
      }
      .desc {
        font-size: 10px;
        color: #999;
        text-align: center;
      }
    }
  }
  .graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card {
      width: 48%;
    }
  }
}
</style>
