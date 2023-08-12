export type DocumentModel = {
    id: string,
    name: string
}

export type SpaceCreateReq = {
    name?: string
    description?: string
    questions?: string[]
}

export type SpaceRes = {
    id: string
    shortId: string
    name: string
    description: string
    questions: string[]
    status: string
    createdAt: Date
    updatedAt: Date
    version: number
}

export type SpaceDocument = {
    shortId: string
    name: string
}