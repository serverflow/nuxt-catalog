<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-[#000000a1] bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Форма заявки</h2>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Имя</label>
          <input
            v-model="formData.name"
            type="text"
            class="w-full px-3 py-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Телефон</label>
          <input
            v-model="formData.tel"
            type="tel"
            class="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          class="bg-[#3f3f3f] w-full text-white px-4 py-2 rounded ease-linear duration-150 hover:bg-[#6873ff] cursor-pointer"
        >
          Отправить
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close", "submit"]);

const formData = reactive({
  name: "",
});

const submitForm = () => {
  emit("submit", formData);
  emit("close");
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
