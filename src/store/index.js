import Vue from 'vue';
import Vuex from 'vuex';
import { tableData } from './modules/table-data';

Vue.use(Vuex);

const store = {
  modules: {
    tableData,
  },
};

export default new Vuex.Store(store);
