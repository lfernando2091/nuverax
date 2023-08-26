import {authHeaders} from "../../@auth/SharedHeaders";
import {Recipient, RecipientCreateReq, RecipientUpdateReq} from "../space/models/RecipientModel";
import {IdResponse} from "../../models/ResponseModel";


interface RecipientService {
    create: (data: RecipientCreateReq) => Promise<IdResponse>
    getAll: (spaceId: string) => Promise<Recipient[]>
    update: (recipientId: string, data: RecipientUpdateReq) => Promise<IdResponse>
    del: (recipientId: string) => Promise<IdResponse>
}

export const recipientService = (): RecipientService => {
    const create = async (data: RecipientCreateReq): Promise<IdResponse> => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_ORCHESTRATOR_URL}/recipient`,
            {
                headers: {
                    "Content-Type": "application/json",
                    ...authHeaders()
                },
                body: JSON.stringify(data),
                method: "POST"
            })
        if (res.ok) {
            return await res.json()
        }
        return Promise.reject(new Error("Error"))
    }
    const getAll = async (spaceId: string): Promise<Recipient[]> => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_ORCHESTRATOR_URL}/recipient/space/${spaceId}`,
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
    const update = async (recipientId: string, data: RecipientUpdateReq): Promise<IdResponse> => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_ORCHESTRATOR_URL}/recipient/${recipientId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    ...authHeaders()
                },
                body: JSON.stringify(data),
                method: "PUT"
            })
        if (res.ok) {
            return await res.json()
        }
        return Promise.reject(new Error("Error"))
    }
    const del = async (recipientId: string): Promise<IdResponse> => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_ORCHESTRATOR_URL}/recipient/${recipientId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    ...authHeaders()
                },
                method: "DELETE"
            })
        if (res.ok) {
            return await res.json()
        }
        return Promise.reject(new Error("Error"))
    }
    return {
        create,
        getAll,
        update,
        del
    }
}