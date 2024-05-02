"use client"

import { createContext, useState } from "react"


export const ThemeContext = createContext<any>({});

export const ThemeProvider = ({
    children
}: Readonly<{children: React.ReactNode}>) => {
    const [mode, setMode] = useState("dark");
    const toggle = () => {
        setMode((prev) => (prev === "dark" ? "light" : "dark"));
    }

    return <ThemeContext.Provider value={{
        toggle, mode
    }}>
        <div className={`theme ${ mode }`}>
            {children}
        </div>
    </ThemeContext.Provider>
}