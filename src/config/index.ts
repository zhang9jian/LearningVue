const env = import.meta.env.MODE|| 'prod';  
  
const envConfig= {  
    dev: {  
        baseApi: '/api',  
        mockApi: '/home/getData'  
    },  
    prod: {  
        baseApi: '/api',  
        mockApi: '/home/getData'  
    },  
    test: {  
        baseApi: '/api',  
        mockApi: '/home/getData'  
    }  
};  
  
// 导出配置  
export default {  
    env,  
    mock: true,  
    ...envConfig[env as keyof typeof envConfig]
};