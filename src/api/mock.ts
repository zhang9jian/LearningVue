import Mock from 'mockjs'
import homeApi from './mockData/homeMock'
//拦截请求
Mock.mock('/home/getTableData',homeApi.getHomeData)
Mock.mock('/home/getOrderData',homeApi.getOrderData)
Mock.mock('/home/getChartData',homeApi.getChartData)