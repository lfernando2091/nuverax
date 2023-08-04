import "./OneColumnLayout.css"
import {ReactNode, useState} from "react";
import {Footer} from "./components/Footer";
import {Header} from "./components/Header";
import {
    Avatar,
    Box, Button, Card,
    CssBaseline,
    Drawer,
    Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Paper, Stack,
    Toolbar, Typography
} from "@mui/material";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {ListItemLink} from "../../components/ListItemLink";
import {useAppContext} from "../../pages/router";
import {SubMenu1Skeleton, SubMenu2Skeleton} from "./skeleton/Skeleton";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {Link} from "react-router-dom";
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';

export type Props = {
    children: ReactNode
}
const drawerWidth = 220;
export const OneColumnLayout = ({ children }: Props) => {
    const { navMenu, toolbar } = useAppContext()
    const [navbarOpen, setNavbarOpen] = useState(true);

    const handleDrawerToggle = () => {
        setNavbarOpen(!navbarOpen);
    }

    return (<>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header/>
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
                        {navMenu && navMenu.back &&
                            <Button size="small"
                                    component={Link}
                                    to={ navMenu.back.path }
                                    sx={{ marginTop: "10px", marginBottom: "10px" }}
                                    startIcon={<ArrowBackIosIcon />}>
                                { navMenu.back.name }
                            </Button>
                        }
                        {!navMenu &&
                            <SubMenu1Skeleton/>
                        }
                        {navMenu && navMenu.profile &&
                            <ListItem sx={{ marginBottom: "10px" }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <RocketLaunchIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={navMenu.profile.name}/>
                            </ListItem>
                        }
                        {navMenu && navMenu.subMenu1 &&
                            <>
                            {navMenu.subMenu1.map((main, iMain) => (
                                <List dense
                                      key={iMain}
                                      component="nav"
                                      subheader={
                                          (main.header ? <ListSubheader component="div">
                                              {main.header}
                                          </ListSubheader>: <></>)
                                      }>
                                    {main.items.map((item, iItem) => (
                                        <ListItemLink
                                            key={iItem}
                                            to={item.to ?? ""}
                                            disabled={item.disabled}
                                            primary={item.name}
                                            active={item.active}/>
                                    ))}
                                </List>
                            ))}
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
                {toolbar &&
                    <Paper variant="outlined" square >
                        {/*<IconButton onClick={handleDrawerToggle} size="small">*/}
                        {/*    <ChromeReaderModeIcon />*/}
                        {/*</IconButton>*/}
                    </Paper>
                }
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