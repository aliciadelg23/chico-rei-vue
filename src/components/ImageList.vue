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
  import Vue from "vue";
  
  export default Vue.extend({
    name: "ProductGallery",
    data() {
      return {
        categories: ["Camisetas", "Calçados", "Acessórios"],
        selectedCategory: this.$route.params.type || "Camisetas",
        isDesktop: window.innerWidth >= 769,
        productsByCategory: {
          Camisetas: Array.from({ length: 18 }).map((_, index) => ({
            image: "https://img.freepik.com/fotos-premium/jovem-de-camiseta-amarela-em-branco-sobre-fundo-branco_392895-134111.jpg?w=740",
            title: `Camiseta Modelo ${index + 1}`,
            description: "Camiseta confortável de algodão.",
            price: `R$ ${49.90 + index},90`,
          })),
          Calçados: Array.from({ length: 18 }).map((_, index) => ({
            image: "https://img.freepik.com/fotos-premium/jovem-de-camiseta-amarela-em-branco-sobre-fundo-branco_392895-134111.jpg?w=740",
            title: `Calçado Modelo ${index + 1}`,
            description: "Calçado confortável e estiloso.",
            price: `R$ ${99.90 + index * 10},90`,
          })),
          Acessórios: Array.from({ length: 18 }).map((_, index) => ({
            image: "https://img.freepik.com/fotos-premium/jovem-de-camiseta-amarela-em-branco-sobre-fundo-branco_392895-134111.jpg?w=740",
            title: `Acessório ${index + 1}`,
            description: "Acessório de alta qualidade.",
            price: `R$ ${29.90 + index * 5},90`,
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
      updateScreenSize() {
        this.isDesktop = window.innerWidth >= 769;
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
    mounted() {
      window.addEventListener("resize", this.updateScreenSize);
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.updateScreenSize);
    },
  });
  </script>
  
  <style lang="less" scoped>
  @primary-color: #333;
  @font-size-title: 2rem;
  @font-size-text: 1rem;
  @price-color: #42b983;
  @max-width-desktop: 1024px;
  
  .gallery {
    
    text-align: center;
    max-width: @max-width-desktop;
    margin: 0 auto;
  }
  
  .gallery-title {
    font-size: @font-size-title;
    font-weight: bold;
    margin-bottom: 2rem;
    color: @primary-color;
  }
  
  .category-selector {
    margin-bottom: 1rem;
  }
  
  select {
    padding: 0.5rem;
    font-size: 1rem;
  }
  
  .gallery-grid {
    display: grid;
    gap: 1.5rem;
    justify-content: center;
  }
  
  /* Mobile: 2 produtos por linha */
  @media (max-width: 768px) {
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  
    .gallery-item {
      flex-direction: column;
      text-align: center;
      display: flex;
      align-items: center;
    }
  
    .gallery-item img {
      width: 8rem;
      max-width: 100%;
      height: 12rem;
      border-radius: 6px;
    }
  
    .gallery-item .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-top: 0.5rem;
    }
  }
  
  /* Desktop: 3 produtos por linha */
  @media (min-width: 769px) {
    .gallery-grid {
      grid-template-columns: repeat(3, 1fr);
      max-width: @max-width-desktop;
      margin: 0 auto;
    }
  
    .gallery-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      
    }
  
    .gallery-item img {
      width: 15rem;
      max-width: 100%;
      height: 20rem;
      border-radius: 8px;
    }
  
    .gallery-item .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }
  
    .gallery-item h3 {
      font-size: @font-size-text;
      margin: 0.5rem 0;
      color: @primary-color;
    }
  
    .gallery-item p {
      font-size: 0.9rem;
      color: darkgray;
    }
  
    .gallery-item .price {
      font-size: 1.2rem;
      font-weight: bold;
      color: @price-color;
      margin-top: 0.5rem;
    }
  }
  </style>
  