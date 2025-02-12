import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ProductList from "../views/ProductList.vue";
import Checkout from "../views/Checkout.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/products", component: ProductList },
  { path: "/checkout", component: Checkout },
];

export default new VueRouter({
  mode: "history",
  routes,
});
