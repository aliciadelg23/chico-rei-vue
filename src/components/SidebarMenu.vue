<template>
  <div class="menu-container" :class="{ desktop: !isMobile }">
    <button @click="toggleMenu" class="menu-button" v-if="isMobile && !isOpen">☰</button>
    <nav class="sidebar" :class="{ open: isOpen, desktop: !isMobile }">

      <img
        class="logo"
         v-if="!isMobile || !isOpen"
        src="https://chico-rei.imgix.net/images/site/2021/brand/chico-rei-text.svg"
        alt="Chico Rei Logo"
      />
      
      <div class="menu-header" v-if="isMobile">
        <span class="menu-title" v-if="isOpen">Menu</span>
        <button @click="toggleMenu" class="close-button">✖</button>
      </div>

      <ul>
        <li><router-link to="/" @click.native="closeMenu">Home</router-link></li>
        <li><router-link to="/products" @click.native="closeMenu">Produtos</router-link></li>
        <li><router-link to="/checkout" @click.native="closeMenu">Checkout</router-link></li>
      </ul>
    </nav>
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
      this.$emit("menuToggled", this.isOpen);
    },
    closeMenu() {
      if (this.isMobile) {
        this.isOpen = false;
        this.$emit("menuToggled", false);
      }
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth < 768;
      this.isOpen = !this.isMobile;
      this.$emit("menuToggled", this.isOpen);
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
@primary-color: #333;

.menu-container {
  position: relative;
  display: flex;
  width: 100%;
  margin: 0;

  &.desktop .sidebar {
    position: relative;
    width: 100%;
    left: auto;
    top: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    height: 70px;
    padding: 0 20px;
  }

  &.desktop .logo {
    max-height: 40px;
  }

  &.desktop ul {
    padding: 0;
    display: flex;
    margin: 0;
  }

  &.desktop ul li {
    margin: 0;
    padding: 0 15px;
  }
}

@keyframes slideIn {
  from {
    left: -250px;
  }
  to {
    left: 0;
  }
}

@keyframes slideOut {
  from {
    left: 0;
  }
  to {
    left: -250px;
  }
}

.sidebar {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100%;
  background: #c9c9c9;
  color: black;
  transition: left 0.3s ease-in-out;
  z-index: 1000;
  animation: slideOut 0.3s forwards;

  &.open {
    left: 0;
    animation: slideIn 0.3s forwards;
  }

  ul {
    list-style: none;
    padding: 20px;

    li {
      margin: 15px 0;

      a {
        color: black;
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

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  color: black;
  cursor: pointer;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  font-size: 1.2rem;
  font-weight: bold;
}

.menu-title {
  font-size: 1.2rem;
}

@media (max-width: 767px) {
  .menu-button {
    display: block;
  }
}
</style>