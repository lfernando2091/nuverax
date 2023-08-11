
export type DocumentResponse = {
    shortId: string
    fileName: string
    title: string
    pages: number
}

export type PageContent = {
    text: string
    page: number
    topics: string[]
}