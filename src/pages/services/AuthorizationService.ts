import {Introspect} from "../models/AuthorizationModel";
import {authHeaders} from "../../@auth/SharedHeaders";


type AuthorizationServiceDef = {
    introspect: (token: string) => Promise<Introspect>
}

export const authorizationService = (): AuthorizationServiceDef => {

    const introspect = async (token: string): Promise<Introspect> => {
        const url = new URL(`${process.env.REACT_APP_BACKEND_ORCHESTRATOR_URL}/authz/introspect`)
        const search = new URLSearchParams()
        search.set("t", token)
        url.search = search.toString()
        const res = await fetch(
            url,
            {
                headers: {
                    "Content-Type": "application/json",
                    ...authHeaders()
                },
                method: "GET"
            })
        if (res.ok) {
            return await res.json()
        }
        return Promise.reject(new Error("Error"))
    }

    return {
        introspect
    }
}