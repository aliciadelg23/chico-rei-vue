<template>
  <div id="app">
    <SidebarMenu />
    <router-view />
  </div>
</template>

<script>
import SidebarMenu from "./components/SidebarMenu.vue";

export default {
  name: "AppLayout",
  components: {
    SidebarMenu,
  },
};
</script>
