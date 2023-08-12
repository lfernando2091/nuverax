export type IdResponse = {
    id: string
}

export type CreateAIAnalystRequest = {
    historyId: string
    message: string
}

export type Chat = {
    status: string
    createdAt: Date
    updatedAt: Date
    version: number
    shortId: string
    historyId: string
    role: string
    message: string
    goodFeedback: boolean
    createdUnix: number
    id: string
}

export type HistoryAIAnalystResponse = {
    messages: Chat[]
}

export type Conversation = {
    shortId: string
    spaceId: string
    name: string
    userId: string
    status: string
    createdAt: Date
    updatedAt: Date
    version: number
    id: string
}