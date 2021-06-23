<template lang="html">
  <div class="table-search">
    <div class="table-search__wrapper">
      <input
        type="text"
        class="table-search__input"
        v-model="newSearch"
        @keyup.enter="setSearch"
      />
      <font-awesome-icon icon="search" size="lg" v-if="!newSearch" />
      <button class="table-search__clear-button" @click="clearSearch" v-else>
        <font-awesome-icon icon="times" size="lg" />
      </button>
    </div>
    <button v-if="searched" class="table-search__button" @click="setSearch">
      Найти
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { SET_SEARCH_BY } from '~/store/constants/actions';

export default {
  name: 'TableSearch',

  computed: {
    ...mapState('tableData', ['searchBy']),
    searched() {
      return this.searchBy !== null;
    },
  },

  data() {
    return {
      newSearch: null,
    };
  },

  methods: {
    ...mapActions('tableData', [SET_SEARCH_BY]),
    setSearch(e) {
      if (this.searched && e && e.target.tagName.toLowerCase() === 'input') {
        return;
      }
      this.SET_SEARCH_BY(this.newSearch);
    },
    clearSearch() {
      this.newSearch = '';
      this.setSearch();
    },
  },
};
</script>
