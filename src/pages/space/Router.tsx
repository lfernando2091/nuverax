import {Route} from "react-router-dom";

export const spaceRouter = () => (
    <>
        <Route index lazy={async () => {
            const { Space } = await import("./Space")
            return { Component: Space }
        }}/>
        <Route path="d/:id" lazy={async () => {
            const { Document } = await import("./document/Document")
            return { Component: Document }
        }}/>
    </>
)