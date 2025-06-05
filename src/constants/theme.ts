export const themes = {
    light: {
        label: "Light",
        code: "light",
    },
    dark: {
        label: "Dark",
        code: "dark",
    },
    abyss: {
        label: "Abyss",
        code: "abyss",
    },
} as const

export type ThemeCode = keyof typeof themes