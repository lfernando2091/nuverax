import {AppState, AppContext} from "../@core";
import {Route, Routes} from "react-router-dom";
import {SpaceLayout, spaceRouter} from "./space/SpaceLayout";
import {PagesLayout, pagesRouter} from "./PagesLayout";

export const PagesRouter = () => {
    const state: AppState = {
        appVersion: "0.0.1"
    }

    return (
        <AppContext.Provider value={state}>
            <Routes>
                <Route path="/" element={<PagesLayout />}>
                    { pagesRouter() }
                </Route>
                <Route path="/s/:id" element={<SpaceLayout />}>
                    { spaceRouter() }
                </Route>
            </Routes>
        </AppContext.Provider>
    )
}