import {OneColumnLayout} from "../@core";
import {Outlet, Route, Routes} from "react-router-dom";
import {useContext, createContext} from "react";
import {Home} from "./home/Home";
import {Settings} from "./settings/Settings";

export type AppState = {
    appVersion: string
}

export const AppContext = createContext<AppState>({
    appVersion: ""
})

export const useAppContext = () => useContext(AppContext)

const PagesLayout = () => {
    return (<>
        <OneColumnLayout>
            <Outlet />
        </OneColumnLayout>
    </>)
}

export const PagesRouter = () => {

    const state: AppState = {
        appVersion: "0.0.1"
    }

    return (
        <AppContext.Provider value={state}>
            <Routes>
                <Route path="/" element={<PagesLayout />}>
                    <Route index element={<Home />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </AppContext.Provider>
    )
}