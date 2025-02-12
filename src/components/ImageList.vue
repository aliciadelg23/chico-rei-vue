<template>
  <div class="gallery">
    <h1 class="gallery-title">Produtos</h1>

    <div class="category-selector">
      <select v-model="selectedCategory" @change="updateRoute">
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <div class="gallery-grid">
      <div class="gallery-item" v-for="(item, index) in filteredProducts" :key="index">
        <img :src="item.image" :alt="item.title" />
        <div class="content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <span class="price">{{ item.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "ProductGallery",
  data() {
    return {
      categories: ["Camisetas", "Calçados", "Acessórios"],
      selectedCategory: this.$route.params.type || "Camisetas",
      productsByCategory: {
        Camisetas: Array.from({ length: 18 }).map((_, index) => ({
          image: "https://chicorei.imgix.net/623/9521d980-106c-11ee-841d-8f3f4426cbb8.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top",
          title: `Camiseta Modelo ${index + 1}`,
          description: "Camiseta confortável de algodão.",
          price: `R$ ${(49.90 + index).toFixed(2)}`,
        })),
        Calçados: Array.from({ length: 18 }).map((_, index) => ({
          image: "https://chicorei.imgix.net/623/9521d980-106c-11ee-841d-8f3f4426cbb8.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top",
          title: `Calçado Modelo ${index + 1}`,
          description: "Calçado confortável e estiloso.",
          price: `R$ ${(99.90 + index * 10).toFixed(2)}`,
        })),
        Acessórios: Array.from({ length: 18 }).map((_, index) => ({
          image: "https://chicorei.imgix.net/623/9521d980-106c-11ee-841d-8f3f4426cbb8.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top",
          title: `Acessório ${index + 1}`,
          description: "Acessório de alta qualidade.",
          price: `R$ ${(29.90 + index * 5).toFixed(2)}`,
        })),
      },
    };
  },
  computed: {
    filteredProducts() {
      return this.productsByCategory[this.selectedCategory] || [];
    },
  },
  methods: {
    updateRoute() {
      this.$router.push(`/category/${this.selectedCategory.toLowerCase()}`);
    },
  },
  watch: {
    "$route.params.type"(newType) {
      if (newType) {
        const formattedType = newType.charAt(0).toUpperCase() + newType.slice(1);
        this.selectedCategory = this.categories.includes(formattedType) ? formattedType : "Camisetas";
      }
    },
  },
});
</script>

<style lang="less" scoped>
@primary-color: #333;
@price-color: #42b983;
@max-width-desktop: 1200px;

.gallery {
  text-align: center;
  max-width: @max-width-desktop;
  margin: 0 auto;
}

.gallery-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: @primary-color;
}

.category-selector {
  margin-bottom: 1rem;
}

select {
  padding: 0.7rem;
  font-size: 1.2rem;
}

/* Mobile */
@media (max-width: 768px) {
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .gallery-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
  }

  .gallery-item img {
    width: 100%; 
    max-width: 9rem; 
    height: auto;
    border-radius: 6px;
  }

  .gallery-item .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .gallery-item h3 {
    font-size: 1rem;
    margin: 0;
    padding-top: 1rem;
  }

  .gallery-item p {
    font-size: 0.9rem;
    margin: 0;
    padding-top: 0.5rem;
  }

  .price {
    font-size: 1rem;
  }
}

/* Desktop */
@media (min-width: 769px) {
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }

  .gallery-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: left;
    background: none;
    padding: 2.5rem;
    border-radius: 10px;
    min-height: 26rem;
  }

  .gallery-item img {
    width: 18rem;
    height: auto;
    border-radius: 10px;
    flex-shrink: 0;
  }

  .gallery-item .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    padding-left: 2.5rem;
  }

  .gallery-item h3 {
    font-size: 1.7rem;
    margin: 0.7rem 0;
    color: @primary-color;
  }

  .gallery-item p {
    font-size: 1.3rem;
    color: darkgray;
    margin: 0.7rem 0;
  }

  .gallery-item .price {
    font-size: 1.7rem;
    font-weight: bold;
    color: @price-color;
    margin-top: 0.7rem;
  }
}

</style>
