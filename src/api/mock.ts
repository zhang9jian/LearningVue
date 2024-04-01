import Mock from 'mockjs'
import homeApi from './mockData/homeMock'
import userApi from './mockData/user'
//拦截请求
Mock.mock('/home/getTableData',homeApi.getHomeData)
Mock.mock('/home/getOrderData',homeApi.getOrderData)
Mock.mock('/home/getChartData',homeApi.getChartData)
Mock.mock('/home/getUserList','get',userApi.getUserList)
Mock.mock('/home/createUser','post',userApi.createUser)
