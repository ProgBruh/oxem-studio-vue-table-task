<template lang="html">
  <div class="table-pagination">
    <button
      class="table-pagination__button"
      :disabled="minPage"
      :class="{ 'table-pagination__button--disabled': minPage }"
      @click="SET_ACTUAL_PAGE(pagination.current - 1)"
    >
      <font-awesome-icon icon="arrow-left" size="lg" />
    </button>
    <div class="table-pagination__wrapper">
      <input
        type="number"
        min="1"
        :max="pagination.total + 1"
        class="table-pagination__input"
        :value="pagination.current + 1"
        @input="setPage"
      />
      <span class="table-pagination__total">
        {{ totalPages }}
      </span>
    </div>
    <button
      class="table-pagination__button"
      :disabled="maxPage"
      :class="{ 'table-pagination__button--disabled': maxPage }"
      @click="SET_ACTUAL_PAGE(pagination.current + 1)"
    >
      <font-awesome-icon icon="arrow-right" size="lg" />
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { SET_ACTUAL_PAGE } from '~/store/constants/actions';

export default {
  name: 'TablePagination',

  computed: {
    ...mapState('tableData', ['pagination']),
    totalPages() {
      return `/${this.pagination.total + 1}`;
    },
    minPage() {
      return this.pagination.current === 0;
    },
    maxPage() {
      return this.pagination.current === this.pagination.total;
    },
  },

  methods: {
    ...mapActions('tableData', [SET_ACTUAL_PAGE]),
    setPage(e) {
      let value = parseInt(e.target.value);
      if (!value || value > this.pagination.total + 1) {
        return;
      }
      this.SET_ACTUAL_PAGE(value - 1);
    },
  },
};
</script>
