import {MainContent, NavMenu, OneColumnLayout} from "../@core";
import {Outlet} from "react-router-dom";
import {Avatar, Box, Grid, List, ListItem, ListItemAvatar, ListItemText, ListSubheader} from "@mui/material";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {ListItemLink} from "../components/ListItemLink";
import BlurOnIcon from '@mui/icons-material/BlurOn';
import SettingsIcon from '@mui/icons-material/Settings';
export const PagesLayout = () => {
    return (<>
        <OneColumnLayout>
            <NavMenu>
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
                        <ListItem sx={{ marginBottom: "10px" }}>
                            <ListItemAvatar>
                                <Avatar>
                                    <RocketLaunchIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="User ABC"/>
                        </ListItem>
                        <List dense
                              component="nav"
                              subheader={
                                  <ListSubheader component="div">
                                      Main
                                  </ListSubheader>
                              }>
                            <ListItemLink
                                to="/"
                                disabled={false}
                                primary="Home"
                                active={true}
                                icon={<BlurOnIcon/>}/>
                        </List>
                    </Grid>
                    <Grid item>
                        <List dense
                              component="nav">
                            {/*<ListItemLink*/}
                            {/*    disabled={false}*/}
                            {/*    to="/upgrade"*/}
                            {/*    primary="Upgrade Now"*/}
                            {/*    icon={<RocketLaunchIcon/>}/>*/}
                            <ListItemLink
                                disabled={false}
                                to="/settings"
                                primary="Setting"
                                icon={<SettingsIcon/>}/>
                        </List>
                    </Grid>
                </Grid>
            </NavMenu>
            <MainContent>
                <Box component="div" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '85vh',
                    flexGrow: 1,
                    p: 3
                }}>
                    <Outlet />
                </Box>
            </MainContent>
        </OneColumnLayout>
    </>)
}