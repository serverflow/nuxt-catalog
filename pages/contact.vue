<template>
  <div>
    <h1 class="text-3xl pb-8">Контакты</h1>
    <div class="grid grid-cols-4 gap-4 pb-6">
      <div class="flex bg-white p-4 rounded-xl flex-col gap-2">
        <span class="italic text-[#4A5565]">Номер телефона</span>
        <a href="tel:+78002227001" class="text-2xl">8 (800) 222-70-01</a>
      </div>
      <div class="flex bg-white p-4 rounded-xl flex-col gap-2">
        <span class="italic text-[#4A5565]">Почта</span>
        <a href="mailto:info@getmesite.ru" class="text-2xl"
          >info@getmesite.ru</a
        >
      </div>
      <div class="flex bg-white p-4 rounded-xl flex-col gap-2">
        <span class="italic text-[#4A5565]">Telegram</span>
        <a href="https://t.me/serverflow" class="text-2xl">t.me/serverflow</a>
      </div>
      <div class="flex bg-white p-4 rounded-xl flex-col gap-2">
        <span class="italic text-[#4A5565]">WhatsApp</span>
        <a href="wa.me/79934834956" class="text-2xl">wa.me/79934834956</a>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-6">
      <div class="bg-white p-5 rounded-xl">
        <h2 class="text-2xl pb-4">Москва</h2>
        <a
          href="https://yandex.ru/maps/-/CHTDB-iO"
          class="text-lg"
          target="_blank"
          >ул. 2-я Брестская, 39 строение 4</a
        >
        <div class="rounded-md overflow-hidden mt-4">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A07bba5b2294432b736513b44ae37e55bacce151565cd698951384eedf64c1cd4&amp;source=constructor"
            width="100%"
            height="450"
            frameborder="0"
          ></iframe>
        </div>
      </div>
      <div class="bg-white p-5 rounded-xl">
        <h2 class="text-2xl pb-4">Санкт-Петербург</h2>
        <a
          href="https://yandex.ru/maps/-/CHTDFG-P"
          class="text-lg"
          target="_blank"
          >ул. Заозёрная, 8, корп. 2Л</a
        >
        <div class="rounded-md overflow-hidden mt-4">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A3f35cad5e026a91022639dca19cde4ed641dd265029553ca2e38caffd8782b05&amp;source=constructor"
            width="100%"
            height="450"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const name = ref("");
const email = ref("");
const message = ref("");
</script>
