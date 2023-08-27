export type Size = {
    h: number
    w: number
}

export type PageSize = {
    current: Size
    original: Size
}

export type Position = {
    x: number
    y: number
}

export enum FieldType {
    SIGNATURE = "signature",
    DATE = "date",
    NAME = "name",
    EMAIL = "email"
}

export type Field = {
    id: string
    documentId: string
    recipientId: string
    page: number
    position: Position
    size: Size
    type: FieldType
    action?: "update" | "delete" | "create"
}