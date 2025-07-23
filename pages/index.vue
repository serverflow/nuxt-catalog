<template>
  <div>
    <h1>Product Catalog</h1>
    <Filters @update-filters="updateFilters" />
    <ProductList :products="products" :filters="filters" />
  </div>
</template>

<script setup>
import { reactive } from "vue";
import Filters from "@/components/Filters.vue";
import ProductList from "@/components/ProductList.vue";

const products = [
  {
    id: 1,
    name: "Laptop",
    description: "High performance laptop",
    price: 999,
    category: "electronics",
  },
  {
    id: 2,
    name: "T-Shirt",
    description: "Comfortable cotton t-shirt",
    price: 19,
    category: "clothing",
  },
  {
    id: 3,
    name: "Sofa",
    description: "Comfortable sofa for living room",
    price: 499,
    category: "furniture",
  },
  {
    id: 3,
    name: "TEST",
    description: "Comfortable sofa for living room",
    price: 499,
    category: "furniture",
  },
  // Добавьте другие товары
];

const filters = reactive({
  search: "",
  category: "",
});

function updateFilters(newFilters) {
  Object.assign(filters, newFilters);
}

definePageMeta({
  layout: "default", // Укажите здесь layout для этой страницы
});
</script>
