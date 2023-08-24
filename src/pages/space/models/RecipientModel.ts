export enum RecipientType {
    REQUIRES_SIGNATURE = "REQUIRES_SIGNATURE",
    COPY = "COPY"
}

export type RecipientCreateReq = {
    spaceId: string
    fullName: string
    email: string
    type: RecipientType
}
export interface Recipient{
    id: string
    fullName: string
    email: string
    type: RecipientType
}
export type RecipientUpdateReq = {
    fullName: string
    email: string
    type: RecipientType
}

export interface RecipientItem extends Recipient{
    isNew?: boolean
}