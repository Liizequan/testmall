import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logo:'',
    headStyle:{'background-color': '#eaeaea'},
    themeIndex:0,
    progress:'',
    ws:'',
    hasNewMsgIdsArr:[],
    hasNewMsgStructureArr:[],
    newMsgGroupIdsArr:[]
  },
  mutations: {},
  actions: {},
  modules: {}
});
