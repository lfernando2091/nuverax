import {SpaceCreateReq, SpaceDocument, SpaceRes} from "../models/SpaceModel";
import {IdResponse} from "../../../models/ResponseModel";
import {authHeaders} from "../../../@auth/SharedHeaders";
import {ExtraProps, UploadService, UploadTask} from "../../components/DragAndDropInput";

interface SpaceServiceDef extends UploadService{
    create: (data?: SpaceCreateReq) => Promise<IdResponse>
    list: () => Promise<SpaceRes[]>
    del: (id: string) => Promise<IdResponse>,
    documents: (id: string) => Promise<SpaceDocument[]>
    get: (id: string) => Promise<SpaceRes>
}

export const spaceService = (): SpaceServiceDef => {
    const get = async (id: string): Promise<SpaceRes> => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/space/${id}`,
            {
                headers: {
                    ...authHeaders()
                },
                method: "GET"
            })
        if (res.ok) {
            return await res.json()
        }
        return Promise.reject(new Error("Error"))
    }
    const create = async (data?: SpaceCreateReq): Promise<IdResponse> => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/space`,
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
    const list = async (): Promise<SpaceRes[]> => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/space`,
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
            `${process.env.REACT_APP_BACKEND_URL}/space/${id}`,
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
    const documents = async (id: string): Promise<SpaceDocument[]> => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/space/${id}/documents`,
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
    const upload = async (data: UploadTask, props: ExtraProps) => {
        const formData = new FormData()
        formData.append("file", data.file)
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/space/${props["spaceId"]}/upload`,
            {
            method: "POST",
            headers: {
                ...authHeaders()
            },
            body: formData,
        })
        if (res.ok) {
            return data.id
        }
        return Promise.reject(new Error("Error"))
    }


    return {
        create,
        list,
        del,
        documents,
        get,
        upload
    }
}