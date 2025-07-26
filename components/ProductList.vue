<template>
  <div class="product-list">
    <div v-if="filteredProducts.length" class="products grid grid-cols-4 gap-5">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-item bg-white p-5 rounded-lg"
      >
        <NuxtLink :to="`/product/${product.id}`">
          <img
            :src="`${product.image}`"
            class="w-full h-56 object-contain block"
          />
        </NuxtLink>
        <div class="flex flex-col min-h-45">
          <h3 class="py-2 text-base">{{ product.name }}</h3>
          <p class="text-xl mt-auto mb-2">
            {{ formatPrice(product.price) }} руб.
          </p>
          <NuxtLink
            :to="`/product/${product.id}`"
            class="w-full bg-[#3f3f3f] rounded-sm leading-[40px] text-center text-white block py-1 ease-linear duration-150 hover:bg-[#6873ff]"
            >Конфигурировать</NuxtLink
          >
        </div>
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

function formatPrice(price) {
  return price.toLocaleString("ru-RU", {
    maximumFractionDigits: 0,
    useGrouping: true,
  });
}
</script>
