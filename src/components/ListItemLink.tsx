import {Button, ButtonProps, ListItemButton, ListItemIcon, ListItemText, styled} from "@mui/material";
import {
    NavLink as NavLinkBase,
    NavLinkProps,
} from 'react-router-dom';
import {forwardRef, ReactElement} from "react";
import {purple} from "@mui/material/colors";

interface ListItemLinkProps {
    icon?: ReactElement;
    primary: string;
    secondary?: string;
    to: string;
    end?: boolean;
    disabled?: boolean
}

interface ButtonLinkProps {
    text: string;
    to: string;
    color?: string;
}

/*
className={({ isActive, isPending }) =>
        isPending ? "" : isActive ? "Mui-selected" : ""
    }
 */

interface CustomNavLinkProps extends NavLinkProps {
    activeClassName?: string
}

const Link = forwardRef<HTMLAnchorElement, CustomNavLinkProps>(function Link(
    itemProps,
    ref,
) {
    return <NavLinkBase ref={ref} {...itemProps} role={undefined} className={
        ({isActive, isPending}) =>
            isPending ? `${itemProps.className}` :
                isActive ? `${itemProps.className} Mui-selected ${itemProps.activeClassName ? itemProps.activeClassName: ""}`:
                `${itemProps.className}`
    }/>;
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
        <Button sx={{ color: props.color ?? "#fff", fontSize: "20px" }}
                component={NavLinkBase} to={props.to}>
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
        end,
        disabled
    } = props;

    return (
        <ListItemButton disabled={disabled}
                        component={Link} to={to} end={end}>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={primary} secondary={secondary}/>
        </ListItemButton>
    )
}