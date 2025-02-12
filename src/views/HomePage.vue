<template>
    <div class="home">
      <h1>Produtos</h1>
      <ImageList />
    </div>
  </template>
  
  <script>
  import ImageList from "../components/ImageList.vue";
  
  export default {
    name: "HomePage",
    components: {
      ImageList,
    },
  };
  </script>
  
  <style lang="less" scoped>
  .home {
    padding: 20px;
    text-align: center;
  }
  </style>
  