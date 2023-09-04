import {Outlet} from "react-router-dom";
import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListSubheader,
} from "@mui/material";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {ListItemLink} from "../../components/ListItemLink";
import BlurOnIcon from '@mui/icons-material/BlurOn';
import SettingsIcon from '@mui/icons-material/Settings';
import {useTranslation} from "react-i18next";
import {DashboardLayout} from "../common/DashboardLayout";
export const HomeLayout = () => {
    const { t } = useTranslation("homeNS");

    return (<DashboardLayout
        navbar={<>
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
                  component="nav">
                {/*<ListItemLink*/}
                {/*    disabled={false}*/}
                {/*    to="/upgrade"*/}
                {/*    primary="Upgrade Now"*/}
                {/*    icon={<RocketLaunchIcon/>}/>*/}
                <ListItemLink
                    disabled={false}
                    to="/settings"
                    primary={t("nav.settingsBtn")}
                    icon={<SettingsIcon/>}/>
            </List>
            <List dense
                  component="nav"
                  subheader={
                      <ListSubheader component="div">
                          {t("nav.mainHeader")}
                      </ListSubheader>
                  }>
                <ListItemLink
                    to="/"
                    disabled={false}
                    primary={t("nav.homeBtn")}
                    icon={<BlurOnIcon/>}/>
            </List>
        </>}>
        <Box component="div" sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '85vh',
            flexGrow: 1,
            p: 3
        }}>
            <Outlet />
        </Box>
    </DashboardLayout>)
}