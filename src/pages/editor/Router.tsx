import {Route} from "react-router-dom";

export const editorRouter = () => (
    <>
        <Route index lazy={async () => {
            const { Editor } = await import("./Editor")
            return { Component: Editor }
        }}/>
    </>
)