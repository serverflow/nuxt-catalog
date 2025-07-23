export default {
  ssr: true, // SSR включен по умолчанию
  compatibilityDate: "2025-07-23",
  css: [
    "@/assets/styles/main.css", // Подключение глобальных стилей
  ],
  alias: {
    "@": require("path").resolve(__dirname), // Убедитесь, что алиасы правильно настроены
  },
};
