import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import he from "./locales/he.json";
import en from "./locales/en.json";

const savedLanguage = localStorage.getItem("language") || "he";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            he: {
                translation: he
            },
            en: {
                translation: en
            }
        },

        lng: savedLanguage,
        fallbackLng: "he",

        interpolation: {
            escapeValue: false
        }
    });

const updateDirection = (language: string) => {
    const direction = language === "he" ? "rtl" : "ltr";

    document.documentElement.lang = language;
    document.documentElement.dir = direction;

    document.body.dir = direction;
};

updateDirection(savedLanguage);

i18n.on("languageChanged", (language) => {
    localStorage.setItem("language", language);
    updateDirection(language);
});

export default i18n;