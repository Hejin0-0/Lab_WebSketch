"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"


// What this will do, is that ThemeProvider props and spread them into the NextThemesProvider.
// <ThemeProvider zach="hello" defaultState="dark"> would send those into the {...props} object.
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
    )
}