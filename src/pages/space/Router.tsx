import {Route} from "react-router-dom";

export const spaceRouter = () => (
    <>
        <Route index lazy={async () => {
            const { Space, spaceLoader } = await import("./Space")
            return { Component: Space, loader: spaceLoader }
        }}/>
        <Route path="d/:idDocument" lazy={async () => {
            const { Document, documentLoader, OnError } = await import("./document/Document")
            return { Component: Document, ErrorBoundary: OnError, loader: documentLoader }
        }}/>
    </>
)