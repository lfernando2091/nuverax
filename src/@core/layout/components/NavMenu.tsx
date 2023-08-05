import {ReactNode, useState} from "react";
import {Drawer, Toolbar} from "@mui/material";

const drawerWidth = 220;
export type NavMenuProps = {
    children: ReactNode
}

export const NavMenu = ({ children }: NavMenuProps) => {
    const [navbarOpen, setNavbarOpen] = useState(true);

    const handleDrawerToggle = () => {
        setNavbarOpen(!navbarOpen);
    }

    return (<>
        <Drawer
            variant="persistent"
            open={navbarOpen}
            onClose={handleDrawerToggle}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar variant="dense"/>
            { children }
        </Drawer>
    </>)
}