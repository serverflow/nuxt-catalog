<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/contact">Contact</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <main>
      <slot />
      <!-- Место, где будет рендериться содержимое страниц -->
    </main>
  </div>
</template>
