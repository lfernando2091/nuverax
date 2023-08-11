import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {spaceRouter} from "./space/Router";
import {editorRouter} from "./editor/Router";
import {signRouter} from "./sign/Router";

export const pagesRouter = () => {
    return (<>
        <Route index lazy={async () => {
            const { Home, homeLoader } = await import("./home/Home")
            return {
                loader: homeLoader,
                Component: Home
            }
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
            <Route path="/s/:idSpace" lazy={async () => {
                const { SpaceLayout, spaceLoader } = await import("./space/SpaceLayout")
                return { Component: SpaceLayout, loader: spaceLoader}
            }}>
                { spaceRouter() }
            </Route>
            <Route path="/editor/:idSpace" lazy={async () => {
                const { EditorLayout } = await import("./editor/EditorLayout")
                return { Component: EditorLayout }
            }}>
                { editorRouter() }
            </Route>
            <Route path="/sign/:idSpace" lazy={async () => {
                const { SignLayout } = await import("./sign/SignLayout")
                return { Component: SignLayout }
            }}>
                { signRouter() }
            </Route>
        </>
    )
)