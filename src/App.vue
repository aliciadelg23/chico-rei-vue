<template>
  <div id="app">
    <SidebarMenu @menuToggled="updateLayout" />
    <div class="main-content" :class="{ 'menu-open': isMenuOpen }">
      <router-view />
    </div>
  </div>
</template>

<script>
import SidebarMenu from "./components/SidebarMenu.vue";

export default {
  name: "AppLayout",
  components: {
    SidebarMenu,
  },
  data() {
    return {
      isMenuOpen: window.innerWidth >= 768,
    };
  },
  methods: {
    updateLayout(isOpen) {
      this.isMenuOpen = isOpen;
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.isMenuOpen = window.innerWidth >= 768;
    });
  },
};
</script>

<style lang="less">
.main-content {
  transition: margin-left 0.3s ease-in-out;
  padding: 2rem;
  max-width: 100%;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .main-content {
    padding-left: 1rem;
  }
}
</style>