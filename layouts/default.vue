<template>
  <div class="min-h-screen flex flex-col">
    <header class="h-24 mb-10">
      <div
        class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full gap-4"
      >
        <img
          src="https://serverflow.ru/assets/src/assets/images/svg/logo.svg"
          class="flex-1 px-8"
        />
        <nav class="flex-5">
          <ul class="flex gap-3">
            <li>
              <NuxtLink
                class="text-base text-gray-600 font-medium bg-gray-200 py-2 px-6 rounded-full ease-linear duration-150 hover:bg-[#6873ff] hover:text-white"
                to="/"
                >Каталог серверов</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                class="text-base text-gray-600 font-medium bg-gray-200 py-2 px-6 rounded-full ease-linear duration-150 hover:bg-[#6873ff] hover:text-white"
                to="/about"
                >О нас</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                class="text-base text-gray-600 font-medium bg-gray-200 py-2 px-6 rounded-full ease-linear duration-150 hover:bg-[#6873ff] hover:text-white"
                to="/contact"
                >Контакты</NuxtLink
              >
            </li>
          </ul>
        </nav>
        <div class="flex-2 inline text-center">
          <a
            class="text-lg ease-linear duration-150 hover:text-[#6873ff]"
            href="tel:8 (800) 222-70-01"
            >8 (800) 222-70-01</a
          >
        </div>
        <div class="flex-2 inline text-center">
          <a
            class="text-lg ease-linear duration-150 hover:text-[#6873ff]"
            href="mailto:info@serverflow.ru"
            >info@serverflow.ru</a
          >
        </div>
        <button
          class="flex-3 bg-[#3f3f3f] hover:bg-[#6873ff] text-white py-2 rounded-full cursor-pointer ease-linear duration-150"
          @click="openModal"
        >
          Консультация IT-специалиста
        </button>
      </div>
    </header>
    <main class="flex-grow">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
      <!-- Место, где будет рендериться содержимое страниц -->
    </main>
    <footer class="text-center py-8 bg-gray-800 text-white mt-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        ServerFlow - 2025
      </div>
    </footer>
    <ModalForm
      :isOpen="isModalOpen"
      @close="closeModal"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleSubmit = (formData) => {
  console.log("Данные формы:", formData);
  // Отправка данных на сервер
  alert(`Форма отправлена: ${formData.name}`);
};
</script>
