import {createContext, useContext} from "react";

export type AppState = {
    appVersion: string,
    language: string
    setLanguage: (value: string) => void
    onUpdateNavbar: (value: boolean) => void
    updateNavbar: boolean
}

export const AppContext = createContext<AppState>({
    appVersion: "",
    language: "es",
    setLanguage: (_value: string) => {},
    onUpdateNavbar: (_value: boolean) => {},
    updateNavbar: false
})

export const useAppContext = () => useContext(AppContext)