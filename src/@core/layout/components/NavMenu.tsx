import {ReactNode, useState} from "react";
import {Box, Divider, Drawer, IconButton, styled, Toolbar} from "@mui/material";
import {LinkButton} from "../../../components/ListItemLink";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export type NavMenuProps = {
    children: ReactNode,
    anchor?: 'left' | 'top' | 'right' | 'bottom',
    width?: number
}

export const NavMenu = ({
                            children,
                            anchor,
                            width
}: NavMenuProps) => {
    const [navbarOpen, setNavbarOpen] = useState(true);

    const handleDrawerToggle = () => {
        setNavbarOpen(!navbarOpen);
    }

    return (<>
        <Drawer
            variant="persistent"
            open={navbarOpen}
            onClose={handleDrawerToggle}
            anchor={anchor ?? "left"}
            sx={{
                width: width ?? 220,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: width ?? 220, boxSizing: 'border-box' },
            }}
        >
            { children }
        </Drawer>
    </>)
}

export type NxNavMenuProps = {
    isMobile?: boolean
    children: ReactNode,
    anchor?: 'left' | 'top' | 'right' | 'bottom',
    width?: number
    open: boolean
    onClose: (value: boolean) => void
}

export const NxNavMenu = ({
                              isMobile,
                            children,
                            anchor,
                            width,
                              open,
                              onClose
                        }: NxNavMenuProps) => {
    const handleDrawerToggle = () => {
        onClose(!open);
    }

    return (<>
        <Drawer
            variant={isMobile ? "temporary": "persistent"}
            open={open}
            onClose={handleDrawerToggle}
            anchor={anchor ?? "left"}
            sx={{
                width: width ?? 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: width ?? 240,
                    // boxSizing: 'border-box',
                    // height: "100vh"
                },
            }}
        >
            <LinkButton color="inherit" to="/" text="NX"/>
            <Divider />
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                justifyContent: "space-between",
                overflowX: "hidden",
                overflowY: "auto",
                overscrollBehavior: "none"
            }}>
                { children }
            </Box>
            <Divider />
            <DrawerHeader>
                <IconButton onClick={handleDrawerToggle} size="small">
                    <ChevronLeftIcon/>
                </IconButton>
            </DrawerHeader>
        </Drawer>
    </>)
}

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}))