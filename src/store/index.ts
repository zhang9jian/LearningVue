import { createStore } from 'vuex'//修改tsconfig文件解决飘红找不到模块

export default createStore({
  state: {
    isCollapse: true,
  },
  mutations: {
    updateIsCollapse(state:any) {
      state.isCollapse = !state.isCollapse;
    },
  },
});
