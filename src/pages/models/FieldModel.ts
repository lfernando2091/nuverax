import {FieldType} from "../../components/pdf-viewer";

export type Position = {
    x: number,
    y: number
}

export type Size = {
    width: number,
    height: number
}

export type FieldCreateReq = {
    uuId: string
    spaceId: string
    documentId: string
    recipientId: string
    page: number
    type: string
    position: Position
    size: Size
}

export type FieldUpdateReq = {
    position: Position
    size: Size
}

export type FieldUpdateDataBatchReq = {
    uuId: string,
    position: Position
    size: Size
}

export type FieldUpdateBatchReq = {
    update: FieldUpdateDataBatchReq[],
    create: FieldCreateReq[],
    delete: string[]
}

export type FieldUpdateBatchRes = {
    update: string[],
    create: string[],
    delete: string[]
}

export type Field = {
    uuId: string
    spaceId: string
    documentId: string
    recipientId: string
    page: number
    type: FieldType
    position: Position
    size: Size
    action?: "update" | "delete" | "create"
}