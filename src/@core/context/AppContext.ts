import {createContext, useContext} from "react";

export type AppState = {
    appVersion: string,
    language: string
    setLanguage: (value: string) => void
}

export const AppContext = createContext<AppState>({
    appVersion: "",
    language: "es",
    setLanguage: (_value: string) => {}
})

export const useAppContext = () => useContext(AppContext)