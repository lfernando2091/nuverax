import {Position} from "../models/PDFViewerModel";
import {Divider, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import { If } from "../../common/IfStatement";
import SubjectIcon from '@mui/icons-material/Subject';
import ChatIcon from '@mui/icons-material/Chat';
import DescriptionIcon from '@mui/icons-material/Description';
import TryIcon from '@mui/icons-material/Try';

export interface MouseLocation extends Position { }

type ContextMenuViewProps = {
    contextMenu: MouseLocation | null
    onSelect: (item?: string) => void
    textSelectedOptions: boolean
}

export const ContextMenuView = ({
                                    contextMenu,
                                    onSelect,
                                    textSelectedOptions
                                }: ContextMenuViewProps) => {

    return (<>
        <Menu
            open={contextMenu !== null}
            onClose={() => onSelect()}
            anchorReference="anchorPosition"
            anchorPosition={
                contextMenu !== null
                    ? { top: contextMenu.y, left: contextMenu.x }
                    : undefined
            }
        >
            <If condition={textSelectedOptions}>
                <MenuItem onClick={() => onSelect("summarize-text")}>
                    <ListItemIcon><SubjectIcon fontSize="small"/></ListItemIcon>
                    <ListItemText>Summarize Text</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => onSelect("explain-text")}>
                    <ListItemIcon><ChatIcon fontSize="small"/></ListItemIcon>
                    <ListItemText>Explain Text</ListItemText>
                </MenuItem>
                {/*<Divider />*/}
            </If>
            <If condition={!textSelectedOptions}>
                <MenuItem onClick={() => onSelect("summarize-page")}>
                    <ListItemIcon><DescriptionIcon fontSize="small"/></ListItemIcon>
                    <ListItemText>Summarize Page</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => onSelect("explain-page")}>
                    <ListItemIcon><TryIcon fontSize="small"/></ListItemIcon>
                    <ListItemText>Explain Page</ListItemText>
                </MenuItem>
            </If>
        </Menu>
    </>)
}