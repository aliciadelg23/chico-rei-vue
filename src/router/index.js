import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import ProductList from "../views/ProductList.vue";
import Checkout from "../views/ProductCheckout.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomePage },
  { path: "/products", component: ProductList },
  { path: "/checkout", component: Checkout },
  { path: "/category/:type", component: ProductList, props: true }, 
];

export default new VueRouter({
  mode: "history",
  routes,
});
