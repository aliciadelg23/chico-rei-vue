<template>
    <div class="checkout-form">
      <h2>Finalização de Pedido</h2>
      <input v-model="name" placeholder="Nome" />
      <input v-model="cardNumber" placeholder="Número do Cartão" />
      <button @click="validateCheckout">Finalizar</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: "",
        cardNumber: "",
      };
    },
    methods: {
      validateCheckout() {
        if (!this.name || !this.cardNumber) {
          alert("Todos os campos são obrigatórios!");
          return;
        }
        console.log("Pedido finalizado com sucesso!");
      },
    },
  };
  </script>
  
  <style lang="less" scoped>
  .checkout-form {
    padding: 20px;
  
    input {
      display: block;
      margin: 10px 0;
      padding: 5px;
    }
  }
  </style>
  