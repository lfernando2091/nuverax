import {Footer, Header, NxMain, NxNavMenu, SimpleColumLayout} from "../../@core"
import React, {ReactNode, useEffect, useState} from "react";
import {useMediaQuery, useTheme, Box, Toolbar} from "@mui/material";
import { If } from "../../components/common/IfStatement";


export type DashboardLayoutProps = {
    navbar: ReactNode
    rightNavbar?: ReactNode
    children: ReactNode
    onChangeScreenSize?: (isMobile: boolean) => void
    onOpenTemporalDrawer?: () => void,
    rightNavbarOpen?: boolean
    rightDrawerWidth?: number
}

export const DashboardLayout = ({
                                    navbar,
                                    rightNavbar,
                                    children,
                                    onChangeScreenSize,
                                    onOpenTemporalDrawer,
                                    rightNavbarOpen,
                                    rightDrawerWidth
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
        header={<Header open={openNavbar}
                        isMobile={matches}
                        setOpenNavbar={onCloseDrawer}
                        openRightNavbar={rightNavbarOpen}
                        rightDrawerWidth={rightDrawerWidth}/>}
        navbar={<NxNavMenu open={openNavbar} isMobile={matches} onClose={onCloseDrawer}>
            <Box sx={{
                overflowX: "hidden", overflowY: "visible"
            }}>
                { navbar }
            </Box>
        </NxNavMenu>}
        rightNavbar={<>
            <If condition={rightNavbar !== undefined}>
                { rightNavbar }
            </If>
        </>}>
        <NxMain isMobile={matches} open={openNavbar}>
            <Toolbar variant="dense"/>
            { children }
            <Footer/>
        </NxMain>
    </SimpleColumLayout>)
}