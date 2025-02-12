<template>
  <div class="gallery">
   

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
export default {
  props: ["type"],
  data() {
    return {
      categories: ["Camisetas", "Calçados", "Acessórios"],
      selectedCategory: this.$route.params.type || "Camisetas",
      productsByCategory: {
        Camisetas: Array.from({ length: 18 }).map((_, index) => ({
          image: "https://chicorei.imgix.net/623/9521d980-106c-11ee-841d-8f3f4426cbb8.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top",
          title: `Camiseta Modelo ${index + 1}`,
          description: "Camiseta confortável",
          price: `R$ ${(49.90 + index).toFixed(2)}`,
        })),
        Calçados: Array.from({ length: 18 }).map((_, index) => ({
          image: "https://chicorei.imgix.net/623/9521d980-106c-11ee-841d-8f3f4426cbb8.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top",
          title: `Calçado Modelo ${index + 1}`,
          description: "Calçado confortável.",
          price: `R$ ${(99.90 + index * 10).toFixed(2)}`,
        })),
        Acessórios: Array.from({ length: 18 }).map((_, index) => ({
          image: "https://chicorei.imgix.net/623/9521d980-106c-11ee-841d-8f3f4426cbb8.jpg?auto=compress,format&q=65&w=550&h=824&fit=crop&crop=top",
          title: `Acessório Modelo ${index + 1}`,
          description: "Acessório Estiloso.",
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
};
</script>

<style lang="less" scoped>
@primary-color: #333;
@price-color: #42b983;
@max-width-content: 1200px;

.gallery {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
  overflow: hidden; 
}

.gallery-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: @primary-color;
}

.category-selector {
  margin-bottom: 1rem;
}

select {
  padding: 0.7rem;
  font-size: 1.2rem;
  width: 100%;
  max-width: 200px;
}

.gallery-grid {
  display: grid;
  gap: 1.5rem;
  width: 100%;
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    overflow: hidden;
  }
  .gallery-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
  }
  .gallery-item img {
    max-width: 90%;
    height: auto;
  }
}

@media (min-width: 769px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .gallery-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: left;
  }
  .gallery-item img {
    width: 20rem;
    height: 20rem;
    border-radius: 2px;
  }
  .gallery-item .content {
    padding-left: 1.5rem;
  }
  .gallery-item h3 {
    font-size: 1.5rem;
    margin: 0;
  }
  .gallery-item p {
    font-size: 1rem;
  }
  .gallery-item .price {
    font-size: 1.3rem;
    font-weight: bold;
    color: @price-color;
  }
}
</style>
