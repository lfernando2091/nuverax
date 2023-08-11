import {authHeaders} from "../../../../@auth/SharedHeaders";
import {DocumentResponse, PageContent} from "../models/DocumentModel";

type DocumentServiceDef = {
    get: (id: string, options?: { page: number }) => Promise<DocumentResponse | PageContent>
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

    return {
        get
    }
}