<template lang="html">
  <form class="add-item-form" :class="{ 'add-item-form--active': show }">
    <div class="add-item-form__row">
      <span class="add-item-form__name">id</span>
      <input type="text" class="add-item-form__input" v-model="id" />
    </div>
    <div class="add-item-form__row">
      <span class="add-item-form__name">firstName</span>
      <input type="text" class="add-item-form__input" v-model="firstName" />
    </div>
    <div class="add-item-form__row">
      <span class="add-item-form__name">lastName</span>
      <input type="text" class="add-item-form__input" v-model="lastName" />
    </div>
    <div class="add-item-form__row">
      <span class="add-item-form__name">email</span>
      <input type="text" class="add-item-form__input" v-model="email" />
    </div>
    <div class="add-item-form__row">
      <span class="add-item-form__name">phone</span>
      <input
        type="text"
        class="add-item-form__input"
        ref="phone"
        v-model="phone"
      />
    </div>
    <div class="add-item-form__row">
      <button
        type="button"
        name="button"
        class="add-item-form__button"
        :class="{ 'add-item-form__button--disabled': !isValid }"
        :disabled="!isValid"
        @click="addItem"
      >
        Добавить в таблицу
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import { UPDATE_ITEMS } from '~/store/constants/actions';
import {
  required,
  integer,
  alpha,
  email,
  minLength,
} from 'vuelidate/lib/validators';
import IMask from 'imask';

export default {
  name: 'AddItemForm',

  props: {
    show: {
      type: Boolean,
    },
  },

  data() {
    return {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
    };
  },

  validations: {
    id: {
      required,
      integer,
    },
    firstName: {
      required,
      alpha,
    },
    lastName: {
      required,
      alpha,
    },
    email: {
      required,
      email,
    },
    phone: {
      required,
      minLength: minLength(18),
    },
  },

  computed: {
    validId() {
      return !this.$v.id.$invalid;
    },
    validFirstName() {
      return !this.$v.firstName.$invalid;
    },
    validLastName() {
      return !this.$v.lastName.$invalid;
    },
    validEmail() {
      return !this.$v.email.$invalid;
    },
    validPhone() {
      return !this.$v.phone.$invalid;
    },
    isValid() {
      return (
        this.validId &&
        this.validFirstName &&
        this.validLastName &&
        this.validPhone &&
        this.validEmail
      );
    },
  },

  mounted() {
    const phoneMask = IMask(this.$refs.phone, {
      mask: '+{7} (000) 000-00-00',
    });
  },

  methods: {
    ...mapActions('tableData', [UPDATE_ITEMS]),
    addItem() {
      const item = {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
      };
      this.id = null;
      this.firstName = null;
      this.lastName = null;
      this.email = null;
      this.phone = null;
      this.UPDATE_ITEMS(item);
    },
  },
};
</script>
