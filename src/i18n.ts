import { createI18n } from "vue-i18n";
export const messages = {
  en: {
    hello: "Hello",
    CompanyForm: {
      ModalWindowBtnText: "Create company",
    },
  },
  uk: {
    hello: "Привіт",
    CompanyForm: {
      ModalWindowBtnText: "Створити компанію",
    },
  },
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "uk",
  messages,
});

export default i18n;
