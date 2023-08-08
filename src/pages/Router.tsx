import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {spaceRouter} from "./space/Router";
import {editorRouter} from "./editor/Router";

export const pagesRouter = () => {
    return (<>
        <Route index lazy={async () => {
            const { Home } = await import("./home/Home")
            return { Component: Home }
        }}/>
        <Route path="settings" lazy={async () => {
            const { Settings } = await import("./home/settings/Settings")
            return { Component: Settings }
        }}/>
    </>)
}

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" lazy={async () => {
                const { HomeLayout } = await import("./home/HomeLayout")
                return { Component: HomeLayout }
            }}>
                { pagesRouter() }
            </Route>
            <Route path="/s/:id" lazy={async () => {
                const { SpaceLayout } = await import("./space/SpaceLayout")
                return { Component: SpaceLayout }
            }}>
                { spaceRouter() }
            </Route>
            <Route path="/editor/:id" lazy={async () => {
                const { EditorLayout } = await import("./editor/EditorLayout")
                return { Component: EditorLayout }
            }}>
                { editorRouter() }
            </Route>
        </>
    )
)