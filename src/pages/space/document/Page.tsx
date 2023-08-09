import {Avatar, Card, CardHeader, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {MouseEvent, useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArticleIcon from '@mui/icons-material/Article';
import {AIAnalyst} from "../../../components/ai-analyst/AIAnalyst";
import {useTranslation} from "react-i18next";

export type PageProps = {
    pageNumber: number,
    pageTitle: string
}

export const Page = ({
                         pageNumber,
                         pageTitle
                     }: PageProps) => {
    const { t } = useTranslation("spaceDocNS");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [showAiAnalyst, setShorAiAnalyst] = useState(false)

    const handleMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onAiAnalyst = () => {
        setShorAiAnalyst(true)
    }

    const onClose = () => {
        setShorAiAnalyst(false)
    }

    return (
        <>
            <Card square variant="outlined">
                <CardHeader
                    avatar={
                        <Avatar>
                            {pageNumber}
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={handleMenu}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={pageTitle}
                />
            </Card>
            <Menu
                elevation={1}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem dense onClick={onAiAnalyst}>
                    <ListItemIcon>
                        <AutoAwesomeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{ t("pageMenu.aiPageAnalystOpt") }</ListItemText>
                </MenuItem>
                <MenuItem dense>
                    <ListItemIcon>
                        <ArticleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{ t("pageMenu.pageContentOpt") }</ListItemText>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem dense>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{ t("pageMenu.deleteOpt") }</ListItemText>
                </MenuItem>
            </Menu>

            <AIAnalyst
                context={{
                    title: pageTitle,
                    type: "page",
                    id: "0"
                }}
                show={showAiAnalyst}
                onClose={onClose}/>
        </>
    )
}