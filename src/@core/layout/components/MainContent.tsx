import {Box, Toolbar} from "@mui/material";
import {ReactNode} from "react";
import {Footer} from "./Footer";

export type MainContentProps = {
    children: ReactNode
}

export const MainContent = ({ children }: MainContentProps) => {
    return (<>
        <Box component="main" sx={{
            overflowX: 'hidden',
            overflowY: "visible",
            width: "100%"
        }}>
            <Toolbar variant="dense"/>
            {children}
            <Footer/>
        </Box>
    </>)
}