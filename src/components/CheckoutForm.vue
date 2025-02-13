<template>
  <div class="product-checkout">
    <h1>Checkout</h1>
    <CheckoutForm />
  </div>
</template>

<script>
import CheckoutForm from '../components/CheckoutForm.vue';

export default {
  components: {
    CheckoutForm
  }
}
</script>

<style lang="less" scoped>
.product-checkout {
  padding: 20px;
}
</style>