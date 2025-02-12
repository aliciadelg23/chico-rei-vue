<template>
    <div class="checkout-form">
      <h2>Finalização do Pedido</h2>
  
      <div class="form-section">
        <h3>Informações de Contato</h3>
        <div class="form-group">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="form.email" />
        </div>
        <div class="form-group">
          <label for="telefone">Telefone</label>
          <input type="tel" id="telefone" v-model="form.telefone" />
        </div>
      </div>
  
      <div class="form-section">
        <h3>Informações de Entrega</h3>
        <div class="form-group">
          <label for="cep">CEP</label>
          <input type="text" id="cep" v-model="form.cep" @blur="buscarEndereco" />
          <button @click="buscarEndereco">
            <span role="img" aria-label="Buscar">🔍</span>
          </button>
        </div>
        <div class="form-group">
          <label for="rua">Rua</label>
          <input type="text" id="rua" v-model="form.rua" />
        </div>
        <div class="form-group">
          <label for="bairro">Bairro</label>
          <input type="text" id="bairro" v-model="form.bairro" />
        </div>
        <div class="form-group">
          <label for="cidade">Cidade</label>
          <input type="text" id="cidade" v-model="form.cidade" />
        </div>
        <div class="form-group">
          <label for="estado">Estado</label>
          <input type="text" id="estado" v-model="form.estado" />
        </div>
      </div>
  
      <div class="form-section">
        <h3>Informações de Pagamento</h3>
        <div class="form-group">
          <label for="numeroCartao">Número do Cartão</label>
          <input type="text" id="numeroCartao" v-model="form.numeroCartao" />
        </div>
        <div class="form-group">
          <label for="titularCartao">Titular do Cartão</label>
          <input type="text" id="titularCartao" v-model="form.titularCartao" />
        </div>
        <div class="form-group">
          <label for="dataVencimento">Data de Vencimento</label>
          <input type="text" id="dataVencimento" v-model="form.dataVencimento" />
        </div>
        <div class="form-group">
          <label for="cvc">CVC</label>
          <input type="text" id="cvc" v-model="form.cvc" />
        </div>
      </div>
  
      <button @click="fecharPedido">Fechar Pedido</button>
  
      <div v-if="loading">Carregando...</div>
      <div v-if="pedidoFechado">
        <p>{{ mensagemSucesso }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import cep from 'cep-promise'
  export default {
    data() {
      return {
        form: {
          email: '',
          telefone: '',
          cep: '',
          rua: '',
          cidade: '',
          bairro: '',
          estado: '',
          numeroCartao: '',
          titularCartao: '',
          dataVencimento: '',
          cvc: ''
        },
        loading: false,
        pedidoFechado: false,
        mensagemSucesso: ''
      }
    },
    methods: {
          async buscarEndereco() {
              try {
                  this.loading = true;
                  const endereco = await cep(this.form.cep);
                  this.form.rua = endereco.street;
                  this.form.cidade = endereco.city;
                  this.form.bairro = endereco.neighborhood;
                  this.form.estado = endereco.state;
              } catch (error) {
                  console.error("Erro ao buscar endereço:", error);
                  alert("CEP não encontrado ou inválido.");
              } finally {
                  this.loading = false;
              }
          },
          validarFormatoEmail(email) {
              const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return regex.test(email);
          },
          validarCampos() {
              if (!this.form.email || !this.form.telefone || !this.form.cep || !this.form.rua || !this.form.cidade || !this.form.bairro || !this.form.estado || !this.form.numeroCartao || !this.form.titularCartao || !this.form.dataVencimento || !this.form.cvc) {
                  alert('Por favor, preencha todos os campos.');
                  return false;
              }
      
              if (!this.validarFormatoEmail(this.form.email)) {
                  alert('Por favor, insira um e-mail válido.');
                  return false;
              }
      
              
      
              return true;
          },
          fecharPedido() {
            if (this.validarCampos()) {
                console.log('Pedido finalizado com sucesso!', this.form);
                this.pedidoFechado = true;
                this.mensagemSucesso = 'Pedido realizado com sucesso!';
                console.log("Dados do pedido:", this.form);
              } else {
                  console.log("Erro ao fechar o pedido: Campos inválidos.");
              }
          },
        }
      }
  </script>
  
  <style lang="less" scoped>
  .checkout-form {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  
    h2 {
      text-align: center;
      margin-bottom: 20px;
      color: #333;
    }
  
    .form-section {
      margin-bottom: 20px;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
  
      h3 {
        margin-top: 0;
        margin-bottom: 10px;
        color: #555;
      }
    }
  
    .form-group {
      margin-bottom: 15px;
  
      label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
        color: #666;
      }
  
      input[type="text"],
      input[type="email"],
      input[type="tel"] {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 16px;
      }
  
      input[type="text"]:focus,
      input[type="email"]:focus,
      input[type="tel"]:focus {
        outline: none;
        border-color: #cdcdce;
        box-shadow: 0 0 5px rgba(102, 175, 233, 0.5);
      }
    }
  
    button {
      background-color: #dadada;
      color: white;
      padding: 12px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 18px;
  
      &:hover {
        background-color: #868686;
      }
    }
  }
  </style>