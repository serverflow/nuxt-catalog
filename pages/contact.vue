<template>
  <div>
    <h1>Contact Us</h1>
    <form>
      <div>
        <label for="name">Name</label>
        <input id="name" type="text" v-model="name" />
      </div>
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div>
        <label for="message">Message</label>
        <textarea id="message" v-model="message"></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
const name = ref("");
const email = ref("");
const message = ref("");
</script>
