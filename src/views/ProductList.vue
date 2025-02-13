<template>
  <div class="product-list">
    <ImageList :type="$route.params.type" />
  </div>
</template>

<script>
import ImageList from "@/components/ImageList.vue";

export default {
  components: {
    ImageList,
  },
};
</script>

<style lang="less" scoped>
.product-list {
  padding-top: 1.5rem;
}
</style>
