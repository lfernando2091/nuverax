import {Field, FieldCreateReq, FieldUpdateBatchReq, FieldUpdateBatchRes, FieldUpdateReq} from "../models/FieldModel";
import {IdResponse} from "../../models/ResponseModel";
import {authHeaders} from "../../@auth/SharedHeaders";

type FieldServiceDef = {
    create: (data: FieldCreateReq) => Promise<IdResponse>
    update: (id: string, data: FieldUpdateReq) => Promise<FieldUpdateReq>
    del: (id: string) => void
    batch: (data: FieldUpdateBatchReq) => Promise<FieldUpdateBatchRes>
    getFields: (
        spaceId: string,
        documentId: string,
        recipientId: string,
        page: number
    ) => Promise<Field[]>
}

export const fieldService = (): FieldServiceDef => {
    const getFields = async (
        spaceId: string,
        documentId: string,
        recipientId: string,
        page: number
    ): Promise<Field[]> => {
        const url = new URL(`${process.env.REACT_APP_BACKEND_ORCHESTRATOR_URL}/field`)
        const search = new URLSearchParams()
        search.set("space-id", spaceId)
        search.set("document-id", documentId)
        search.set("recipient-id", recipientId)
        search.set("page", `${page}`)
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
    const create = async (data: FieldCreateReq): Promise<IdResponse> => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_ORCHESTRATOR_URL}/field`,
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
    const batch = async (data: FieldUpdateBatchReq): Promise<FieldUpdateBatchRes> => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_ORCHESTRATOR_URL}/field/batch`,
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
    const update = async (id: string, data: FieldUpdateReq): Promise<FieldUpdateReq> => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_ORCHESTRATOR_URL}/field/${id}`,
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
    const del = async (id: string): Promise<IdResponse> => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_ORCHESTRATOR_URL}/field/${id}`,
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
        getFields,
        batch,
        create,
        update,
        del
    }
}