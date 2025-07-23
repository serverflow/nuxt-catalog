<template>
  <div class="product-list">
    <div v-if="filteredProducts.length" class="products">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-item"
      >
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>{{ product.price }} руб.</p>
        <NuxtLink :to="`/product/${product.id}`">Подробнее</NuxtLink>
        <!-- Ссылка на страницу товара -->
      </div>
    </div>
    <div v-else>
      <p>No products found</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  products: Array,
  filters: Object,
});

const filteredProducts = computed(() => {
  return props.products.filter((product) => {
    let matches = true;
    if (props.filters.search) {
      matches = product.name
        .toLowerCase()
        .includes(props.filters.search.toLowerCase());
    }
    if (props.filters.category && matches) {
      matches = product.category === props.filters.category;
    }
    return matches;
  });
});
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
}
.product-item {
  width: 100%;
  margin: 1%;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
