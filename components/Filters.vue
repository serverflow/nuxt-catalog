<template>
  <div class="filters">
    <input
      v-model="search"
      placeholder="Поиск товаров"
      @input="updateFilters"
    />
    <select v-model="category" @change="updateFilters">
      <option value="">Все категории</option>
      <option value="electronics">Electronics</option>
      <option value="clothing">Clothing</option>
      <option value="furniture">Furniture</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Определяем событие для отправки данных родительскому компоненту
const emit = defineEmits();

const search = ref("");
const category = ref("");

function updateFilters() {
  // Отправляем фильтры в родительский компонент
  emit("update-filters", { search: search.value, category: category.value });
}
</script>

<style scoped>
.filters {
  margin: 20px 0;
}
input,
select {
  padding: 8px;
  margin: 5px;
  width: 200px;
}
</style>
