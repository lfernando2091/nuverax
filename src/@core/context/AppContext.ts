import {createContext, useContext} from "react";

export type AppState = {
    appVersion: string,
}

export const AppContext = createContext<AppState>({
    appVersion: ""
})

export const useAppContext = () => useContext(AppContext)