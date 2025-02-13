<template>
  <div class="checkout-form">
    <h2>Finalização do Pedido</h2>

    <div class="checkout-container">
      <div class="form-sections">
        <div class="form-section">
          <h3>Informações de Contato</h3>
          <div class="form-group">
            <label for="email">E-mail</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              placeholder="E-mail"
            />
          </div>
          <div class="form-group">
            <label for="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              v-model="form.telefone"
              placeholder="Telefone"
            />
          </div>
        </div>

        <div class="form-section">
          <h3>Informações de Entrega</h3>
          <div class="form-group">
            <label for="cep">CEP</label>
            <div class="cep-container">
              <input
                type="text"
                id="cep"
                v-model="form.cep"
                placeholder="CEP"
                @blur="buscarEndereco"
              />
              <button @click="buscarEndereco">
                <span role="img" aria-label="Buscar">🔍</span>
              </button>
            </div>
          </div>
          <div class="form-group">
            <label for="rua">Rua</label>
            <input type="text" id="rua" v-model="form.rua" placeholder="Rua" />
          </div>
          <div class="form-group">
            <label for="numero">Número</label>
            <input
              type="text"
              id="numero"
              v-model="form.numero"
              placeholder="Número"
            />
          </div>
          <div class="form-group">
            <label for="complemento">Complemento</label>
            <input
              type="text"
              id="complemento"
              v-model="form.complemento"
              placeholder="Complemento"
            />
          </div>
          <div class="form-group">
            <label for="bairro">Bairro</label>
            <input
              type="text"
              id="bairro"
              v-model="form.bairro"
              placeholder="Bairro"
            />
          </div>
          <div class="form-group">
            <label for="cidade">Cidade</label>
            <input
              type="text"
              id="cidade"
              v-model="form.cidade"
              placeholder="Cidade"
            />
          </div>
          <div class="form-group">
            <label for="estado">Estado</label>
            <input
              type="text"
              id="estado"
              v-model="form.estado"
              placeholder="Estado"
            />
          </div>
        </div>

        <div class="form-section">
          <h3>Informações de Pagamento</h3>
          <div class="form-group">
            <label for="numeroCartao">Número do Cartão</label>
            <input
              type="text"
              id="numeroCartao"
              v-model="form.numeroCartao"
              placeholder="Número do Cartão"
            />
          </div>
          <div class="form-group">
            <label for="titularCartao">Titular do Cartão</label>
            <input
              type="text"
              id="titularCartao"
              v-model="form.titularCartao"
              placeholder="Titular do Cartão"
            />
          </div>
          <div class="form-group">
            <label for="dataVencimento">Data de Vencimento</label>
            <input
              type="text"
              id="dataVencimento"
              v-model="form.dataVencimento"
              placeholder="Data de Vencimento"
            />
          </div>
          <div class="form-group">
            <label for="cvc">CVC</label>
            <input type="text" id="cvc" v-model="form.cvc" placeholder="CVC" />
          </div>
        </div>
      </div>

      <div class="cart-section">
        <h3>Sua Sacola</h3>
        <div class="cart-item">
          <img
            src="https://chicorei.imgix.net/623/9521d980-106c-11ee-841d-8f3f4426cbb8.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top"
            alt="Produto Lorem"
          />
          <div class="item-details">
            <p>Produto Lorem</p>
            <p>R$ 19,90</p>
          </div>
          <div class="quantity-controls">
            <button @click="decreaseQuantity">-</button>
            <span>{{ quantity }}</span>
            <button @click="increaseQuantity">+</button>
          </div>
        </div>
        <div class="total">Total: R$ {{ totalPrice.toFixed(2) }}</div>
      </div>
    </div>

    <button @click="fecharPedido" :disabled="loading">
      {{ loading ? "Processando..." : "Finalizar Pedido" }}
    </button>
    <div v-if="mensagemSucesso" class="success-message">
      {{ mensagemSucesso }}
    </div>
  </div>
</template>

<script>
import cep from "cep-promise";

export default {
  data() {
    return {
      form: {
        email: "",
        telefone: "",
        cep: "",
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        numeroCartao: "",
        titularCartao: "",
        dataVencimento: "",
        cvc: "",
      },
      quantity: 1,
      itemPrice: 19.9,
      loading: false,
      mensagemSucesso: "",
    };
  },
  computed: {
    totalPrice() {
      return this.quantity * this.itemPrice;
    },
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
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    validarCampos() {
      const {
        email,
        telefone,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado,
        numeroCartao,
        titularCartao,
        dataVencimento,
        cvc,
      } = this.form;
      if (
        !email ||
        !telefone ||
        !cep ||
        !rua ||
        !numero ||
        !bairro ||
        !cidade ||
        !estado ||
        !numeroCartao ||
        !titularCartao ||
        !dataVencimento ||
        !cvc
      ) {
        alert("Todos os campos são obrigatórios!");
        return false;
      }

      if (!this.validarFormatoEmail(email)) {
        alert("Por favor, insira um e-mail válido.");
        return false;
      }

      if (!this.validarFormatoTelefone(telefone)) {
        alert("Por favor, insira um telefone válido.");
        return false;
      }

      if (!this.validarFormatoCEP(cep)) {
        alert("Por favor, insira um CEP válido.");
        return false;
      }

      if (!this.validarFormatoCartao(numeroCartao)) {
        alert("Por favor, insira um número de cartão válido.");
        return false;
      }

      if (!this.validarFormatoDataVencimento(dataVencimento)) {
        alert("Por favor, insira uma data de vencimento válida.");
        return false;
      }

      if (!this.validarFormatoCVC(cvc)) {
        alert("Por favor, insira um código CVC válido.");
        return false;
      }

      return true;
    },
    validarFormatoEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },
    validarFormatoTelefone(telefone) {
      const regex = /^\d{10,11}$/;
      return regex.test(telefone);
    },
    validarFormatoCEP(cep) {
      const regex = /^\d{8}$/;
      return regex.test(cep);
    },
    validarFormatoCartao(numeroCartao) {
      const regex = /^\d{16}$/;
      return regex.test(numeroCartao);
    },
    validarFormatoDataVencimento(dataVencimento) {
      const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      return regex.test(dataVencimento);
    },
    validarFormatoCVC(cvc) {
      const regex = /^\d{3,4}$/;
      return regex.test(cvc);
    },
    fecharPedido() {
      if (this.validarCampos()) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.mensagemSucesso = "Pedido realizado com sucesso!";
          console.log("Dados do pedido:", this.form);
        }, 2000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.checkout-form {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  .checkout-container {
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .form-sections {
    flex: 2;
    margin-right: 20px;
  }

  .cart-section {
    flex: 1;
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    h3 {
      margin-top: 0;
      margin-bottom: 10px;
      color: #555;
    }

    .cart-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
        border: 1px solid #eee;
      }

      .item-details {
        flex-grow: 1;

        p {
          margin: 0;
          font-size: 16px;
          color: #333;
        }
      }

      .quantity-controls {
        display: flex;
        align-items: center;

        button {
          background-color: #f0f0f0;
          border: none;
          padding: 5px 10px;
          cursor: pointer;
          font-size: 16px;

          &:hover {
            background-color: #ddd;
          }
        }

        span {
          margin: 0 10px;
          font-size: 18px;
          color: #555;
        }
      }
    }

    .total {
      text-align: right;
      font-size: 20px;
      font-weight: bold;
      color: #333;
    }
  }

  .success-message {
    margin-top: 20px;
    padding: 15px;
    background-color: #7af088;
    border: 1px solid #ffffff;
    color: #3c763d;
    border-radius: 4px;
    text-align: center;
  }

  .form-section {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #eee;
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
      font-weight: bold;
      margin-bottom: 5px;
      color: #777;
    }

    .cep-container {
      display: flex;
      align-items: center;
    }

    input[type="email"],
    input[type="tel"],
    input[type="text"] {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      font-size: 16px;
      transition: border-color 0.2s;

      &:focus {
        outline: none;
        border-color: #66afe9;
      }
    }
  }

  button {
    background-color: #e0e0e0;
    color: rgb(27, 27, 27);
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;
    margin-left: 10px;

    &:hover {
      background-color: #baf7aa;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
}
</style>
