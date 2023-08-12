import {authHeaders} from "../../../@auth/SharedHeaders";
import {
    Chat,
    Conversation,
    CreateAIAnalystRequest,
    HistoryAIAnalystResponse,
    IdResponse
} from "../models/AIAnalystModel";

type AIAnalystServiceDef = {
    init: (spaceId: string) => Promise<IdResponse>
    chat: (data: CreateAIAnalystRequest) =>  Promise<Chat>
    history: (historyId: string) => Promise<HistoryAIAnalystResponse>
    conversations: (spaceId: string) => Promise<Conversation[]>
}

export const aiAnalystService = (): AIAnalystServiceDef => {
    const init = async (spaceId: string): Promise<IdResponse> => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/chat/init/${spaceId}`,
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

    const chat = async (data: CreateAIAnalystRequest): Promise<Chat> => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/chat`,
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

    const history = async (historyId: string): Promise<HistoryAIAnalystResponse> => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/chat/${historyId}`,
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

    const conversations = async (spaceId: string): Promise<Conversation[]> => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/space/${spaceId}/chats`,
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

    return {
        init,
        chat,
        history,
        conversations
    }
}