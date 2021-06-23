<template lang="html">
  <div class="app">
    <template v-if="mode">
      <template v-if="loaded">
        <template v-if="correctItems">
          <div class="app__wrapper">
            <button class="app__add-button" @click="formHandler">
              {{ buttonContent }}
            </button>
            <AddItemForm :show="showAddItemForm" />
          </div>
          <Table v-if="items && loaded" :items="items" ref="table" />
          <Info
            v-if="current"
            :name="current.firstName"
            :lastName="current.lastName"
            :email="current.email"
            :description="current.description"
            :address="current.address"
          />
        </template>
        <div class="app__info" v-else>
          <span class="app__info-title"> Данные отсуствуют </span>
          <span class="app__info-subtitle"> Повторите попытку позже </span>
        </div>
      </template>
      <Loading v-else />
    </template>
    <Select @set-mode="setMode" v-else />
  </div>
</template>

<script>
import Select from './Select/Select';
import Loading from './Loading/Loading';
import AddItemForm from './AddItemForm/AddItemForm';
import Table from './Table/Table';
import Info from './Info/Info';
import { mapState, mapGetters, mapActions } from 'vuex';
import { GET_TABLE_DATA } from '~/store/constants/actions';

export default {
  name: 'App',

  components: {
    Select,
    Loading,
    AddItemForm,
    Table,
    Info,
  },

  data() {
    return {
      mode: null,
      showAddItemForm: false,
    };
  },

  computed: {
    ...mapState('tableData', {
      data: 'items',
      current: 'current',
      search: 'searchBy',
      pagination: 'pagination',
      sort: 'sort',
      loaded: 'loaded',
    }),
    itemsPerPage: {
      cache: false,
      get() {
        return this.data
          ? this.data.slice(
              this.pagination.current * 20,
              this.pagination.current * 20 + 20,
            )
          : [];
      },
    },
    itemsBySearch: {
      cache: false,
      get() {
        return this.search
          ? this.itemsPerPage.filter((el) => {
              let find = false;
              for (const key in el) {
                if (
                  el[key]
                    .toString()
                    .toLowerCase()
                    .includes(this.search.toLowerCase())
                ) {
                  find = true;
                }
              }
              if (find) {
                return el;
              }
            })
          : this.itemsPerPage;
      },
    },
    items: {
      cache: false,
      get() {
        const defaultItems = this.itemsBySearch;
        const sortedItems = this.itemsBySearch.sort((a, b) => {
          const v0 = a[this.sort.by];
          const v1 = b[this.sort.by];
          if (v0 < v1) return -1;
          if (v0 > v1) return 1;
          return 0;
        });
        return this.sort.type === 'none'
          ? defaultItems
          : this.sort.type === 'up'
          ? sortedItems
          : sortedItems.reverse();
      },
    },
    buttonContent() {
      return this.showAddItemForm ? 'Скрыть' : 'Добавить';
    },
    correctItems() {
      return this.data !== null;
    },
  },

  methods: {
    ...mapActions('tableData', [GET_TABLE_DATA]),
    showCurrent(item) {
      this.current = item;
    },
    formHandler() {
      this.showAddItemForm = !this.showAddItemForm;
    },
    async setMode(mode) {
      this.mode = mode;
      await this.GET_TABLE_DATA(mode);
    },
  },
};
</script>
