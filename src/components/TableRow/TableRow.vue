<template lang="html">
  <tr class="table-row" @click="setCurrentItem">
    <td v-for="value in item" v-if="validType(value)" class="table-col">
      <span class="table-col__name">{{ value }}</span>
    </td>
  </tr>
</template>

<script>
import { SET_CURRENT } from '~/store/constants/actions';
import { mapActions } from 'vuex';

export default {
  name: 'TableRow',

  props: {
    item: {
      type: Object,
    },
  },

  methods: {
    validType(item) {
      return typeof item === 'number' || typeof item === 'string';
    },
    ...mapActions('tableData', [SET_CURRENT]),
    async setCurrentItem() {
      await this.SET_CURRENT(this.item);
    },
  },
};
</script>
