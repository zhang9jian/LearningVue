import request from './request'

export default {
    getTableData(params:string){
        return request({ 
            url:'/home/getTableData',
            method:'get',
            data:params,
            mock:true,
        })
    },
    getOrderData(){
        return request({ 
            url:'/home/getOrderData',
            method:'get',
            mock:true,
        })
    },
    getChartData(){
        return request({ 
            url:'/home/getChartData',
            method:'get',
            mock:true,
        })
    } 
}