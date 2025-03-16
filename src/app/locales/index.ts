import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n.use(Backend)
    .use(initReactI18next)
    .init({
        lng: localStorage.getItem('lang') || 'en',
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
        backend: {
            loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
        },
    })

export default i18n
