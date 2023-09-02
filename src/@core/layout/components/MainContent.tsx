import {Box, styled, Toolbar} from "@mui/material";
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

export interface NxMainProps {
    open?: boolean;
    drawerWidth?: number
}

export const NxMain =
    styled('main', { shouldForwardProp: (prop) => prop !== 'open' })
    <NxMainProps>(({ theme, open, drawerWidth }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth ?? 240}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}))