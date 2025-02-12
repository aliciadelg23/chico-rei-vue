<template>
    <div class="category-selector">
      <select v-model="localCategory" @change="emitCategory">
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  import Vue from "vue";
  
  export default Vue.extend({
    name: "CategorySelect",
    props: {
      categories: {
        type: Array,
        required: true,
      },
      selectedCategory: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        localCategory: this.selectedCategory, // Armazena o valor localmente
      };
    },
    methods: {
      emitCategory() {
        this.$emit("categoryChanged", this.localCategory); // Emite para o pai
      },
    },
  });
  </script>
  
  <style lang="less" scoped>
  .category-selector {
    margin-bottom: 1rem;
  }
  
  select {
    padding: 0.7rem;
    font-size: 1.2rem;
  }
  </style>
  