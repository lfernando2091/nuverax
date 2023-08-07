import {Route} from "react-router-dom";

export const requestSignRouter = () => (
    <>
        <Route index lazy={async () => {
            const { RequestSign } = await import("./RequestSign")
            return { Component: RequestSign }
        }}/>
    </>
)