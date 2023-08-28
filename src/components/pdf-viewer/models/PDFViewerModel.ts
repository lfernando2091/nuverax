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
    SIGNATURE = "SIGNATURE",
    DATE = "DATE",
    NAME = "NAME",
    EMAIL = "EMAIL"
}