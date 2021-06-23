<template lang="html">
  <thead>
    <th
      v-for="(col, index) of cols"
      :key="index"
      class="table-head-col"
      @click="CHANGE_SORT_TYPE(col)"
    >
      <div class="table-head-col__wrapper">
        <span class="table-head-col__name">
          {{ col }}
        </span>
        <div
          class="table-head-col__icon-wrapper"
          :class="{
            'table-head-col__icon-wrapper--up': sortUp,
            'table-head-col__icon-wrapper--down': sortDown,
          }"
          v-if="sortByCol(col)"
        >
          <font-awesome-icon :icon="icon" size="lg" />
        </div>
      </div>
    </th>
  </thead>
</template>

<script>
import { CHANGE_SORT_TYPE } from '~/store/constants/actions';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'TableHead',

  props: {
    cols: {
      type: Array,
    },
  },

  computed: {
    ...mapState('tableData', ['sort']),
    sortUp() {
      return this.sort.type === 'up';
    },
    sortDown() {
      return this.sort.type === 'down';
    },
    icon() {
      return this.sortUp ? 'caret-up' : 'caret-down';
    },
  },

  methods: {
    ...mapActions('tableData', [CHANGE_SORT_TYPE]),
    sortByCol(col) {
      return this.sort.by === col && this.sort.type !== 'none';
    },
  },
};
</script>
