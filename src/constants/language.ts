export const languages = {
    th: {
        label: "ไทย",
        value: "th",
        icon: "TH",
    },
    en: {
        label: "English",
        value: "en",
        icon: "EN",
    },
} as const

export type LanguageCode = keyof typeof languages