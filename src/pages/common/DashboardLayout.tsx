import {Footer, Header, NxMain, NxNavMenu, SimpleColumLayout} from "../../@core"
import React, {ReactNode, useEffect, useState} from "react";
import {useMediaQuery, useTheme, Box, Toolbar} from "@mui/material";


export type DashboardLayoutProps = {
    navbar: ReactNode
    children: ReactNode
    onChangeScreenSize?: (isMobile: boolean) => void
    onOpenTemporalDrawer?: () => void
}

export const DashboardLayout = ({
                                    navbar,
                                    children,
                                    onChangeScreenSize,
                                    onOpenTemporalDrawer
                                }: DashboardLayoutProps) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const [openNavbar, setOpenNavbar] = useState(!matches)
    const onCloseDrawer = (value: boolean) => {
        setOpenNavbar(value)
    }

    useEffect(() => {
        if (onChangeScreenSize) {
            onChangeScreenSize(matches)
        }
    }, [matches]);
    useEffect(() => {
        if (openNavbar && matches) {
            if (onOpenTemporalDrawer) {
                onOpenTemporalDrawer()
            }
        }
    }, [openNavbar]);

    return (<SimpleColumLayout
        header={<Header open={openNavbar} isMobile={matches} setOpenNavbar={onCloseDrawer}/>}
        navbar={<NxNavMenu open={openNavbar} isMobile={matches} onClose={onCloseDrawer}>
            <Box sx={{
                overflowX: "hidden", overflowY: "visible"
            }}>
                { navbar }
            </Box>
        </NxNavMenu>}>
        <NxMain isMobile={matches} open={openNavbar}>
            <Toolbar variant="dense"/>
            { children }
            <Footer/>
        </NxMain>
    </SimpleColumLayout>)
}