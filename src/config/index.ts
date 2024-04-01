const env =  'prod';  
  
const envConfig= {  
    dev: {  
        baseApi: '/',  
        mockApi: '/home/getData'  
    },  
    prod: {  
        baseApi: '/',  
        mockApi: '/home/getData'  
    },  
    test: {  
        baseApi: '/',  
        mockApi: '/home/getData'  
    }  
};  
  
// 导出配置  
export default {  
    env,  
    mock: true,  
    ...envConfig[env as keyof typeof envConfig]
};