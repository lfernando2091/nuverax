import "./Header.css"
import {AppBar, AppBarProps, Box, IconButton, Menu, MenuItem, styled, Toolbar} from "@mui/material";
import {LinkButton} from "../../../components/ListItemLink";
import TranslateIcon from '@mui/icons-material/Translate';
import {MouseEvent, useState} from "react";
import {useAppContext} from "../../context/AppContext";
import {useTranslation} from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";

export type HeaderProps = {
    open?: boolean
    setOpenNavbar?: (value: boolean) => void
}

export const Header = ({ open, setOpenNavbar }: HeaderProps) => {
    const { i18n } = useTranslation();
    const [anchorTranslate, setAnchorTranslate] = useState<null | HTMLElement>(null)
    const { language, setLanguage } = useAppContext()

    const handleMenuLanguages = (event: MouseEvent<HTMLElement>) => {
        setAnchorTranslate(event.currentTarget);
    };

    const handleCloseLanguages = () => {
        setAnchorTranslate(null);
    };

    const onSelectLanguage = async (value: string) => {
        await i18n.changeLanguage(value)
        setLanguage(value)
        handleCloseLanguages()
    }
    const onCloseDrawer = (value: boolean) => {
        if (setOpenNavbar) {
            setOpenNavbar(value)
        }
    }

    return (
        // component="nav"
        <NxAppBar
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            position="fixed"
            elevation={0}>
            <Toolbar variant="dense">
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => onCloseDrawer(!open)}
                    edge="start"
                    sx={{
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{
                        ...(open && { display: 'none' }),
                    }}>
                        <LinkButton to="/"
                                    text="NX"/>
                    </Box>
                </Box>
                {/*<IconButton color="inherit">*/}
                {/*    <Badge badgeContent={4} color="secondary">*/}
                {/*        <NotificationsIcon fontSize="small"/>*/}
                {/*    </Badge>*/}
                {/*</IconButton>*/}
                <IconButton onClick={handleMenuLanguages} color="inherit">
                    <TranslateIcon fontSize="small"/>
                </IconButton>
                <Menu
                    elevation={1}
                    anchorEl={anchorTranslate}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorTranslate)}
                    onClose={handleCloseLanguages}
                    onClick={handleCloseLanguages}
                >
                    <MenuItem selected={language === "es"} onClick={() => onSelectLanguage("es")}>
                        Español (Latinoamérica)
                    </MenuItem>
                    <MenuItem selected={language === "en"} onClick={() => onSelectLanguage("en")}>
                        English (US)
                    </MenuItem>
                </Menu>
            </Toolbar>
        </NxAppBar>
    )
}

export interface NxBarProps extends AppBarProps {
    open?: boolean;
    drawerWidth?: number
}

export const NxAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<NxBarProps>(({ theme, open, drawerWidth }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth ?? 240}px)`,
        marginLeft: `${drawerWidth ?? 240}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))