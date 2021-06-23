<template lang="html">
  <div class="table">
    <table class="table__figure">
      <TableHead :cols="cols" />
      <tbody>
        <template v-if="items.length">
          <TableRow v-for="(item, index) of items" :key="index" :item="item" />
        </template>
        <tr v-else>
          <th :colspan="cols.length" class="table__info">Данные отсуствуют</th>
        </tr>
      </tbody>
    </table>
    <div class="table__controls">
      <TableSearch />
      <TablePagination />
    </div>
  </div>
</template>

<script>
import TableHead from '~/components/TableHead/TableHead';
import TableRow from '~/components/TableRow/TableRow';
import TableSearch from '~/components/TableSearch/TableSearch';
import TablePagination from '~/components/TablePagination/TablePagination';

export default {
  name: 'Table',

  components: {
    TableHead,
    TableRow,
    TableSearch,
    TablePagination,
  },

  props: {
    items: {
      type: Array,
    },
  },

  watch: {
    items() {
      this.$forceUpdate();
    },
  },

  data() {
    return {
      currentRow: null,
      cols: [],
    };
  },

  mounted() {
    const [item] = this.items;
    this.cols = Object.entries(item)
      .map((el) => {
        if (typeof el[1] === 'number' || typeof el[1] === 'string') {
          return el[0];
        }
      })
      .filter((el) => el !== undefined);
  },
};
</script>
