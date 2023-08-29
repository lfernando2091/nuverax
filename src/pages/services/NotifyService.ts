import {authHeaders} from "../../@auth/SharedHeaders";
import {IdResponse} from "../../models/ResponseModel";


type NotifyServiceDef = {
    get: (spaceId: string) => Promise<IdResponse>
}

export const notifyService = (): NotifyServiceDef => {
    const get = async (
        spaceId: string
    ): Promise<IdResponse> => {
        const url = new URL(`${process.env.REACT_APP_BACKEND_ORCHESTRATOR_URL}/notify/${spaceId}`)
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
        get
    }
}