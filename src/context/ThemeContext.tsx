import { createContext, useState } from "react"

type ThemeContextType = {
    theme: "light" | "dark",
    handleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<"light" | "dark">("light")
    const handleTheme = () => {
        setTheme(prev => prev == "light" ? "dark" : "light")
    }
    return <ThemeContext.Provider value={{ theme, handleTheme }}>
        {children}
    </ThemeContext.Provider>
} 