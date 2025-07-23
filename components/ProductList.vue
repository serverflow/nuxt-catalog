<template>
  <div class="product-list">
    <div v-if="filteredProducts.length" class="products grid grid-cols-4 gap-2">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-item bg-gray-100 p-3 rounded-lg"
      >
        <NuxtLink :to="`/product/${product.id}`">
          <img
            src="https://serverflow.ru/upload/resize_cache/iblock/0a8/y9qujxxtz8zs392zw5r7vzm1rohxuf2u/400_300_0/ba55ac6d-thumbnail-510x510-70.webp"
          />
        </NuxtLink>
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>{{ product.price }} руб.</p>
        <NuxtLink
          :to="`/product/${product.id}`"
          class="w-full bg-[#3f3f3f] text-center text-white block py-1 mt-5 ease-linear duration-150 hover:bg-[#6873ff]"
          >Подробнее</NuxtLink
        >
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
