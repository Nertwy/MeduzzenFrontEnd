import { createI18n } from "vue-i18n";
export const messages = {
  en: {
    hello: "Hello",
  },
  uk: {
    hello: "Привіт",
  },
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "uk",
  messages,
});

export default i18n;