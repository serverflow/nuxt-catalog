import tailwindcss from "@tailwindcss/vite";

export default {
  ssr: true, // SSR включен по умолчанию
  compatibilityDate: "2025-07-23",
  css: [
    "@/assets/styles/main.css", // Подключение глобальных стилей
  ],
  alias: {
    "@": require("path").resolve(__dirname), // Убедитесь, что алиасы правильно настроены
  },
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
        },
      ],
      style: [
        {
          children: `body { font-family: 'Roboto', sans-serif; }`,
        },
      ],
    },
  },
};
