import "./OneColumnLayout.css"
import {ReactNode} from "react";
import {Footer} from "./components/Footer";
import {Header} from "./components/Header";
import {
    Avatar,
    Box,
    CssBaseline,
    Drawer,
    Grid, List, ListItem, ListItemAvatar, ListItemText,
    Toolbar
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {ListItemLink} from "../../components/ListItemLink";

export type Props = {
    children: ReactNode
}
const drawerWidth = 220;
export const OneColumnLayout = ({ children }: Props) => {
    return (<>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header/>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar variant="dense"/>
                <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="stretch"
                    sx={{
                        height: "100%"
                    }}
                >
                    <Grid item>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <RocketLaunchIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="User ABC" />
                        </ListItem>
                        <List dense
                              component="nav"
                              aria-label="home">
                            <ListItemLink
                                to=""
                                primary="Home"
                                active
                                icon={<HomeIcon/>}/>
                        </List>
                    </Grid>
                    <Grid item>
                        <List dense
                              component="nav"
                              aria-label="settings upgrade-now">
                            {/*<ListItemLink*/}
                            {/*    to="/settings"*/}
                            {/*    primary="Upgrade Now"*/}
                            {/*    icon={<RocketLaunchIcon/>}/>*/}
                            <ListItemLink
                                to="/settings"
                                primary="Setting"
                                icon={<SettingsIcon/>}/>
                        </List>
                    </Grid>
                </Grid>
            </Drawer>
            <Box component="main" sx={{
                overflowX: 'hidden',
                overflowY: "visible",
                width: "100%"
            }}>
                <Toolbar variant="dense"/>
                <Box component="div" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '85vh',
                    flexGrow: 1,
                    p: 3
                }}>
                    {children}
                </Box>
                <Footer/>
            </Box>
        </Box>
    </>)
}