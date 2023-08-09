import "./Header.css"
import {AppBar, IconButton, Menu, MenuItem, Toolbar} from "@mui/material";
import {LinkButton} from "../../../components/ListItemLink";
import TranslateIcon from '@mui/icons-material/Translate';
import {MouseEvent, useState} from "react";
import {useAppContext} from "../../context/AppContext";
import {useTranslation} from "react-i18next";

export const Header = () => {
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

    return (
        <AppBar
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            position="fixed"
            component="nav"
            elevation={0}>
            <Toolbar variant="dense">
                <div style={{ flexGrow: 1 }}>
                    <LinkButton to="/" text="NX"/>
                </div>
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
        </AppBar>
    )
}