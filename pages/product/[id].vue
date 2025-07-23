<template>
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <p><strong>Цена:</strong> {{ product.price }} руб.</p>
    <p><strong>Категория:</strong> {{ product.category }}</p>
    <NuxtLink to="/">Назад в каталог</NuxtLink>
  </div>
  <div v-else>
    <p>Product not found</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

// Массив товаров (для примера, в реальности их можно получить через API)
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
  // Добавьте больше товаров по необходимости
];

const route = useRoute();
const product = ref(null);

onMounted(() => {
  const productId = parseInt(route.params.id);
  // Ищем товар по id в массиве
  product.value = products.find((p) => p.id === productId);

  // Если товар не найден, можно дополнительно логировать ошибку
  if (!product.value) {
    console.error(`Product with id ${productId} not found.`);
  }
});
</script>
