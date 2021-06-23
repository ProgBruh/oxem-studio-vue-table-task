import {
  GET_TABLE_DATA,
  SET_CURRENT,
  CHANGE_SORT_TYPE,
  SET_SEARCH_BY,
  SET_ACTUAL_PAGE,
  UPDATE_ITEMS,
} from '../constants/actions';
import { UPDATE_TABLE_STATE, ADD_INTO_ITEMS } from '../constants/mutations';
import TableDataService from '~/services/table-data/TableDataService';

const initialState = () => ({
  items: null,
  current: null,
  loaded: false,
  searchBy: null,
  pagination: {
    current: null,
    total: null,
  },
  sort: {
    by: null,
    type: 'none',
  },
});

const state = initialState;

const mutations = {
  [UPDATE_TABLE_STATE](state, data) {
    Object.assign(state, data);
  },
  [ADD_INTO_ITEMS](state, item) {
    state.items.unshift(item);
  },
};

const actions = {
  async [GET_TABLE_DATA]({ commit }, mode) {
    try {
      const tableData = await TableDataService.getDataList(mode);
      const { data } = tableData;
      commit(UPDATE_TABLE_STATE, { items: data });
      commit(UPDATE_TABLE_STATE, {
        pagination: {
          current: 0,
          total: Math.round(data.length / 20) - 1,
        },
      });
    } catch {
      commit(UPDATE_TABLE_STATE, { items: null });
    }
    commit(UPDATE_TABLE_STATE, { loaded: true });
  },
  async [SET_CURRENT]({ commit }, current) {
    commit(UPDATE_TABLE_STATE, { current });
  },
  async [SET_SEARCH_BY]({ commit }, searchBy) {
    commit(UPDATE_TABLE_STATE, { searchBy });
  },
  [CHANGE_SORT_TYPE]({ commit, state }, by) {
    const { sort } = state;
    const types = {
      none: 'up',
      up: 'down',
      down: 'none',
    };
    const value = {
      by,
      type: by === sort.by ? types[sort.type] : 'up',
    };
    commit(UPDATE_TABLE_STATE, { sort: value });
  },
  [SET_ACTUAL_PAGE]({ commit, state }, page) {
    const { pagination } = state;
    const value = {
      current: page,
      total: pagination.total,
    };
    commit(UPDATE_TABLE_STATE, { pagination: value });
  },
  async [UPDATE_ITEMS]({ commit, state }, item) {
    await commit(ADD_INTO_ITEMS, item);
    const { items } = state;
    commit(UPDATE_TABLE_STATE, {
      pagination: {
        current: 0,
        total: Math.round(items.length / 20) - 1,
      },
    });
  },
};

export const tableData = {
  namespaced: true,
  state,
  mutations,
  actions,
};
