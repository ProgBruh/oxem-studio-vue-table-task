<template lang="html">
  <div class="info">
    <button class="info__close" @click="close">
      <font-awesome-icon icon="times" size="lg" />
    </button>
    <span class="info__row"
      >Выбран пользователь <b>{{ fullname }}</b></span
    >
    <span class="info__row" v-if="description">Описание:</span>
    <textarea rows="8" cols="80" :value="description" v-if="description" />
    <span class="info__row" v-if="address"
      >Адрес проживани: <b>{{ address.streetAddress }}</b></span
    >
    <span class="info__row" v-if="address"
      >Город: <b>{{ address.city }}</b></span
    >
    <span class="info__row" v-if="address"
      >Провинция/штат: <b>{{ address.state }}</b></span
    >
    <span class="info__row" v-if="address"
      >Индекс: <b>{{ address.zip }}</b></span
    >
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { SET_CURRENT } from '~/store/constants/actions';

export default {
  name: 'BottomInfo',

  computed: {
    fullname() {
      return `${this.name} ${this.lastName}`;
    },
  },

  props: {
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    description: {
      type: String,
    },
    address: {
      type: Object,
    },
  },

  methods: {
    ...mapActions('tableData', [SET_CURRENT]),
    close() {
      this.SET_CURRENT(null);
    },
  },
};
</script>
