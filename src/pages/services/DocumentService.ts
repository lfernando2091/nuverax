import {authHeaders} from "../../@auth/SharedHeaders";
import {DocumentResponse, PageContent} from "../space/document/models/DocumentModel";
import {IdResponse} from "../../models/ResponseModel";

type DocumentServiceDef = {
    get: (id: string, options?: { page: number }) => Promise<DocumentResponse | PageContent>
    del: (id: string) => Promise<IdResponse>,
    downloadUrl: (
        id: string,
        disposition?: "INLINE" | "ATTACHMENT",
        type?: "ORIGINAL" | "SIGNED") => URL
}

export const documentService = (): DocumentServiceDef => {

    const get = async (id: string, options?: { page: number }): Promise<DocumentResponse | PageContent> => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/doc/${id}${options ? `?${options.page ? `page=${options.page}`:""}`: ""}`,
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

    const del = async (id: string): Promise<IdResponse> => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/doc/${id}`,
            {
                headers: {
                    ...authHeaders()
                },
                method: "DELETE"
            })
        if (res.ok) {
            return await res.json()
        }
        return Promise.reject(new Error("Error"))
    }

    const downloadUrl = (id: string,
                         disposition = "ATTACHMENT",
                         type = "ORIGINAL"): URL => {
        const url = new URL(`${process.env.REACT_APP_BACKEND_URL}/doc/${id}/download`)
        const search = new URLSearchParams()
        search.set("disposition", disposition)
        search.set("type", type)
        url.search = search.toString()
        return url
    }
    return {
        get,
        del,
        downloadUrl
    }
}