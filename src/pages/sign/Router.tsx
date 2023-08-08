import {Route} from "react-router-dom";

export const signRouter = () => (
    <>
        <Route index lazy={async () => {
            const { Sign } = await import("./Sign")
            return { Component: Sign }
        }}/>
        <Route path="d/:id" lazy={async () => {
            const { Document } = await import("./document/Document")
            return { Component: Document }
        }}/>
    </>
)