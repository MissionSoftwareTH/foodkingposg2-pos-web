export const themes = {
    light: {
        label: "Light",
        code: "light",
    },
    dark: {
        label: "Dark",
        code: "dark",
    },
} as const

export type ThemeCode = keyof typeof themes