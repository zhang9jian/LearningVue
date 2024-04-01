import { tableV2CellProps } from "element-plus/es/components/table-v2/src/cell.mjs";
import { defineStore } from "pinia";

export const useCollapseStore = defineStore("collapse", {
  state() {
    return {
      isCollapse: true,
      currentMenu: null,
      tabsList: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "home",
        },
      ],
    };
  },
  actions: {
    updateCollapse() {
      this.isCollapse = !this.isCollapse;
    },

    selectMenu(value) {
      if (this.currentMenu == "home") {
        this.currentMenu = null;
      } else {
        this.currentMenu = value;
        let result = this.tabsList.findIndex(item => item.name == value.name)
        result == -1 ? this.tabsList.push(value):''
      }
    },

    closeTab(val){
      let res = this.tabsList.findIndex((item)=>item.name == val.name)
      this.tabsList.splice(res,1)
    }
  },
});
