import "./OneColumnLayout.css"
import {ReactNode, useState} from "react";
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
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {ListItemLink} from "../../components/ListItemLink";
import {useAppContext} from "../../pages/router";
import {SubMenu1Skeleton, SubMenu2Skeleton} from "./skeleton/Skeleton";

export type Props = {
    children: ReactNode
}
const drawerWidth = 220;
export const OneColumnLayout = ({ children }: Props) => {
    const { navMenu } = useAppContext()

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
                        {!navMenu &&
                            <SubMenu1Skeleton/>
                        }
                        {navMenu && navMenu.subMenu1 &&
                            <>
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
                                      component="nav">
                                    {navMenu.subMenu1.map((e, i) => (
                                        <ListItemLink
                                            key={i}
                                            to={e.to ?? ""}
                                            disabled={e.disabled}
                                            primary={e.name}
                                            active={e.active}/>
                                    ))}
                                </List>
                            </>
                        }
                    </Grid>
                    <Grid item>
                        {!navMenu &&
                            <SubMenu2Skeleton/>
                        }
                        {navMenu && navMenu.subMenu2 &&
                            <List dense
                                  component="nav">
                            {navMenu.subMenu2.map((e, i) => (
                                <ListItemLink
                                    key={i}
                                    disabled={e.disabled}
                                    to={e.to ?? ""}
                                    primary={e.name}/>
                            ))}
                            </List>
                        }
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