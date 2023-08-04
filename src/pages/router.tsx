import {OneColumnLayout} from "../@core";
import {Outlet, Route, Routes} from "react-router-dom";
import {useContext, createContext, useState} from "react";
import {Home} from "./home/Home";
import {Settings} from "./settings/Settings";
import {defaultMenu, NavMenu} from "../@core/layout/Menu";
import {spaceRouter} from "./space/router";

export type AppState = {
    appVersion: string,
    navMenu?: NavMenu,
    setNavMenu: (value: NavMenu) => void
    toolbar: boolean
    showToolbar: (value: boolean) => void
}

export const AppContext = createContext<AppState>({
    appVersion: "",
    navMenu: defaultMenu,
    setNavMenu: (_value: NavMenu) => {},
    toolbar: false,
    showToolbar: (_value: boolean) => {}
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
    const [navMenu, setNavMenu] = useState<NavMenu>()
    const [toolbar, setToolBar] = useState(false)
    const updateNavMenu = (value: NavMenu) => {
        setNavMenu(value)
    }

    const showToolbar = (value: boolean) => {
        setToolBar(value)
    }

    const state: AppState = {
        appVersion: "0.0.1",
        navMenu,
        setNavMenu: updateNavMenu,
        toolbar,
        showToolbar
    }

    return (
        <AppContext.Provider value={state}>
            <Routes>
                <Route path="/" element={<PagesLayout />}>
                    <Route index element={<Home />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="/s/:id" element={<PagesLayout />}>
                    { spaceRouter() }
                </Route>
            </Routes>
        </AppContext.Provider>
    )
}