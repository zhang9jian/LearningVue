import { defineStore } from 'pinia'

export const useCollapseStore = defineStore('collapse',{
  state() {
    return{
      isCollapse:true
    }
},
actions:{
  updateCollapse(){
      this.isCollapse = !this.isCollapse
  }
},
});

