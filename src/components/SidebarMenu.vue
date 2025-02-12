<template>
    <div>
      <button @click="toggleMenu" class="menu-button" v-if="isMobile">☰</button>
      <div class="sidebar" :class="{ open: isOpen }">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/products">Produtos</router-link></li>
          <li><router-link to="/checkout">Checkout</router-link></li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isOpen: window.innerWidth >= 768, 
        isMobile: window.innerWidth < 768,
      };
    },
    methods: {
      toggleMenu() {
        this.isOpen = !this.isOpen;
      },
      checkScreenSize() {
        this.isMobile = window.innerWidth < 768;
        this.isOpen = !this.isMobile; 
      },
    },
    mounted() {
      window.addEventListener("resize", this.checkScreenSize);
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.checkScreenSize);
    },
  };
  </script>
  
  <style lang="less" scoped>
  .sidebar {
    position: fixed;
    top: 0;
    left: -250px;
    width: 250px;
    height: 100%;
    background: #c9c9c9;
    color: white;
    transition: left 0.3s ease-in-out;
    z-index: 1000;
  
    &.open {
      left: 0;
    }
  
    ul {
      list-style: none;
      padding: 20px;
  
      li {
        margin: 15px 0;
  
        a {
          color: white;
          text-decoration: none;
        }
      }
    }
  }
  
  .menu-button {
    position: fixed;
    top: 15px;
    left: 15px;
    background: #ffffff;
    color: rgb(0, 0, 0);
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 18px;
    z-index: 1100;
    display: none;
  }
  

  @media (max-width: 767px) {
    .menu-button {
      display: block;
    }
  }
  </style>
  