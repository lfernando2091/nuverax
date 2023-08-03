import {Button, ButtonProps, ListItemButton, ListItemIcon, ListItemText, styled} from "@mui/material";
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from 'react-router-dom';
import {forwardRef, ReactElement} from "react";
import {purple} from "@mui/material/colors";

interface ListItemLinkProps {
    icon?: ReactElement;
    primary: string;
    secondary?: string;
    to: string;
    active?: boolean;
    disabled?: boolean
}

interface ButtonLinkProps {
    text: string;
    to: string;
}

const Link = forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
    itemProps,
    ref,
) {
    return <RouterLink ref={ref} {...itemProps} role={undefined} />;
})

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[700]),
    backgroundColor: purple[500],
    '&:hover': {
        backgroundColor: purple[700],
    },
}))

export const LinkButton = (props: ButtonLinkProps) => {
    return (
        <Button sx={{ color: "#fff", fontSize: "20px" }} color="info" component={RouterLink} to={props.to}>
            {props.text}
        </Button>
    )
}

export const ListItemLink = (props: ListItemLinkProps) => {
    const {
        icon,
        primary,
        to ,
        secondary,
        active,
        disabled
    } = props;

    return (
        <ListItemButton selected={active} disabled={disabled} component={Link} to={to}>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={primary} secondary={secondary}/>
        </ListItemButton>
    )
}