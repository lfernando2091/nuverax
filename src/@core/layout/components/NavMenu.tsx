import {ReactNode, useState} from "react";
import {Drawer, Toolbar} from "@mui/material";

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
            <Toolbar variant="dense"/>
            { children }
        </Drawer>
    </>)
}