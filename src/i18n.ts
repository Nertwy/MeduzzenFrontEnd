import { createI18n } from "vue-i18n";
export const messages = {
  en: {
    NavBar: {
      hello: "Hello",
      Home: "Home",
      Logout: "Logout",
      Profile: "Profile",
      Settings: "Settings",
      Stats: "Stats",
    },
    Notification: {
      MarkAsRead: "Mark as read",
    },
    StatsPage: {
      Download: "Download Results",
    },
  },
  uk: {
    NavBar: {
      hello: "Привіт",
      Home: "Додому",
      Logout: "Вийти",
      Profile: "Профіль",
      Settings: "Налаштування",
      Stats: "Статистика",
    },
    Notification: {
      MarkAsRead: "Помітити як прочитане",
    },
    StatsPage: {
      Download: "Завантажити результати",
    },
  },
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "uk",
  messages,
});

export default i18n;
