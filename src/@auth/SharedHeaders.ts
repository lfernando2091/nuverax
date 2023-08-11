import {Buffer} from "buffer"

export const authHeaders = () => ({
    Authorization: `Basic ${
        Buffer
            .from(`${process.env.REACT_APP_USER_NAME}:${process.env.REACT_APP_USER_PASSWORD}`)
            .toString('base64')
    }`
})