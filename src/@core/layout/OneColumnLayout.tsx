import "./OneColumnLayout.css"
import {ReactNode} from "react";
import {Header} from "./components/Header";
import {
    Box,
    CssBaseline
} from "@mui/material";

export type Props = {
    children: ReactNode
}
export const OneColumnLayout = ({ children }: Props) => {
    return (<>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header/>
            {/*
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
            */}
            {children}
        </Box>
    </>)
}