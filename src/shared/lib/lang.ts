import { changeLanguage } from 'i18next'

export type Lang = 'ru' | 'en' | 'cz';

export const getCurrentLanguage = (): Lang => {
    return (localStorage.getItem('lang') as Lang) || 'ru'
}

export const setLanguage = (lang: Lang) => {
    changeLanguage(lang)
    localStorage.setItem('lang', lang)
}
