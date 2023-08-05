import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {SpaceLayout, spaceRouter} from "./space/SpaceLayout";
import {PagesLayout, pagesRouter} from "./PagesLayout";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<PagesLayout />}>
                { pagesRouter() }
            </Route>
            <Route path="/s/:id" element={<SpaceLayout />}>
                { spaceRouter() }
            </Route>
        </>
    )
)