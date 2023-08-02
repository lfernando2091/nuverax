import "./Header.css"
import {AppBar, Badge, IconButton, Toolbar, Typography} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';

export const Header = () => {
    return (
        <AppBar
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            position="fixed"
            component="nav"
            elevation={0}>
            <Toolbar variant="dense">
                <Typography
                    component="h5"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    NX
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon fontSize="small"/>
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}