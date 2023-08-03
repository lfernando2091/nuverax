import "./Home.css"
import {
    Button, Divider,
    Grid, IconButton, List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader, Menu, MenuItem,
    Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {MouseEvent, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import TextFieldsIcon from '@mui/icons-material/TextFields';

type HomeItem = {
    id: string
    name: string
}

type SpaceItemProps = {
    spaceData: HomeItem
}

const items: HomeItem[] = [
    { id: "123", name: "Space ABC1" },
    { id: "124", name: "Space ABC2" },
    { id: "125", name: "Space ABC3" }
]

export const SpaceItem = (props: SpaceItemProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const onClickSpace = (spaceId: string) => {

    }

    const handleMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <ListItem
            secondaryAction={
                <>
                    <IconButton onClick={handleMenu} edge="end">
                        <MoreHorizIcon />
                    </IconButton>
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
                        <MenuItem>
                            <ListItemIcon>
                                <EditIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Edit</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <TextFieldsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Rename</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <ContentCopyIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Duplicate</ListItemText>
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem>
                            <ListItemIcon>
                                <DeleteIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Delete</ListItemText>
                        </MenuItem>
                    </Menu>
                </>
            } disablePadding>
            <ListItemButton onClick={() => onClickSpace(`${props.spaceData.id}`)}>
                <ListItemIcon>
                    <GroupWorkIcon />
                </ListItemIcon>
                <ListItemText primary={props.spaceData.name} />
            </ListItemButton>
        </ListItem>
    )
}

export const Home = () => {
    return <>
        <h3>Home</h3>
        <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
                <Button variant="outlined"
                        color="secondary"
                        sx={{
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            width: "100%"
                }}
                        startIcon={<AddIcon />}>
                    Create space
                </Button>
            </Grid>
            <Grid item xs={6} md={4}>
            </Grid>
            <Grid item xs={6} md={4}>
            </Grid>
        </Grid>

        <List
            sx={{
                marginTop: "30px",
                width: '100%',
                bgcolor: 'background.paper'
        }}
            component="nav"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Last Space
                </ListSubheader>
            }
        >
            {items.map((e) => (
                <SpaceItem spaceData={e}/>
            ))}
        </List>
    </>
}