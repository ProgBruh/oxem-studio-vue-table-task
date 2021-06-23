<template lang="html">
  <div class="select">
    <span class="select__info"> Выберите набор данных: </span>
    <div class="select__wrapper">
      <div class="select__variant">
        <button class="select__button" @click="setMode('short')">
          <font-awesome-icon icon="feather" class="select__icon" />
        </button>
        <span class="select__variant-name">a little bit</span>
      </div>
      <div class="select__variant">
        <button class="select__button" @click="setMode('long')">
          <font-awesome-icon icon="weight-hanging" class="select__icon" />
        </button>
        <span class="select__variant-name">a lot of</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',

  methods: {
    setMode(mode) {
      this.$emit('set-mode', mode);
    },
  },
};
</script>
