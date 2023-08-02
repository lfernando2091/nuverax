import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from 'react-router-dom';
import {forwardRef, ReactElement} from "react";

interface ListItemLinkProps {
    icon?: ReactElement;
    primary: string;
    secondary?: string;
    to: string;
    active?: boolean
}

const Link = forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
    itemProps,
    ref,
) {
    return <RouterLink ref={ref} {...itemProps} role={undefined} />;
})

export const ListItemLink = (props: ListItemLinkProps) => {
    const {
        icon,
        primary,
        to ,
        secondary,
        active
    } = props;

    return (
        <ListItemButton selected={active} component={Link} to={to}>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={primary} secondary={secondary}/>
        </ListItemButton>
    )
}