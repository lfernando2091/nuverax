import "./OneColumnLayout.css"
import {ReactNode} from "react";
import {Header} from "./components/Header";
import {
    Box,
    CssBaseline
} from "@mui/material";

export type Props = {
    children: ReactNode
}
export const OneColumnLayout = ({ children }: Props) => {
    return (<>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header/>
            {children}
        </Box>
    </>)
}