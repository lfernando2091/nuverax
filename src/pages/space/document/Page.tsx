import {Avatar, Card, CardHeader, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {MouseEvent, useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArticleIcon from '@mui/icons-material/Article';

export type PageProps = {
    pageNumber: number,
    pageTitle: string
}

export const Page = ({
                         pageNumber,
                         pageTitle
                     }: PageProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Card square elevation={1} variant="outlined">
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
                <MenuItem dense>
                    <ListItemIcon>
                        <AutoAwesomeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>AI Page Analyst</ListItemText>
                </MenuItem>
                <MenuItem dense>
                    <ListItemIcon>
                        <ArticleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Page Content</ListItemText>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem dense>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}