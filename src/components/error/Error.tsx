import {Alert} from "@mui/material";

export type ApiErrorProps = {
    title: string
}

export const ApiError = ({
                             title
                         }: ApiErrorProps) => {
    return (<>
        <Alert severity="error">{ title }</Alert>
    </>)
}