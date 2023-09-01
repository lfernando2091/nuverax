import {Route} from "react-router-dom";

export const signRouter = () => (
    <>
        <Route index lazy={async () => {
            const { Sign } = await import("./Sign")
            return { Component: Sign }
        }}/>
        <Route path="options" lazy={async () => {
            const { SignOptions } = await import("./sign-options/SignOptions")
            return { Component: SignOptions }
        }}/>
        <Route path="d/:idDocument" lazy={async () => {
            const { Document, documentLoader, OnError } = await import("./document/Document")
            return { Component: Document, loader: documentLoader, ErrorBoundary: OnError }
        }}/>
    </>
)