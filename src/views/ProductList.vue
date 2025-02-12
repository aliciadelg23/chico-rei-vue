<template>
    <div class="product-list">
      <h2>Lista de Produtos</h2>
      <ImageList />
    </div>
  </template>
  
  <script>
  import ImageList from "../components/ImageList.vue";
  
  export default {
    components: { ImageList },
  };
  </script>
  
  <style lang="less" scoped>
  .product-list {
    padding: 20px;
  }
  </style>
  