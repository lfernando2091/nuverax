import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {spaceRouter} from "./space/Router";

export const pagesRouter = () => {
    return (<>
        <Route index lazy={async () => {
            const { Home } = await import("./home/Home")
            return { Component: Home }
        }}/>
        <Route path="settings" lazy={async () => {
            const { Settings } = await import("./settings/Settings")
            return { Component: Settings }
        }}/>
    </>)
}

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" lazy={async () => {
                const { PagesLayout } = await import("./PagesLayout")
                return { Component: PagesLayout }
            }}>
                { pagesRouter() }
            </Route>
            <Route path="/s/:id" lazy={async () => {
                const { SpaceLayout } = await import("./space/SpaceLayout")
                return { Component: SpaceLayout }
            }}>
                { spaceRouter() }
            </Route>
        </>
    )
)