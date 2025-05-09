"use client"

import { createContext, useState, useEffect } from "react"


export const ThemeContext = createContext<any>({});

export const ThemeProvider = ({
    children
}: Readonly<{children: React.ReactNode}>) => {
    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme) {
            setMode(theme);
            document.documentElement.setAttribute("data-theme", theme);
        } else {
            setMode("dark");
            document.documentElement.setAttribute("data-theme", "dark");
        }
    }, []);
    const [mode, setMode] = useState("dark");
    
    const toggle = () => {
        setMode((prev) => (prev === "dark" ? "light" : "dark"));
        localStorage.setItem("theme", mode === "dark" ? "light" : "dark");
        document.documentElement.setAttribute("data-theme", mode === "dark" ? "light" : "dark");
    }

    return <ThemeContext.Provider value={{
        toggle, mode
    }}>
        <div className={`theme ${ mode }`}>
            {children}
        </div>
    </ThemeContext.Provider>
}