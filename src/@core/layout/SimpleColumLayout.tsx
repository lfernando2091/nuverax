import React, {ReactNode} from "react";
import {CssBaseline, Box} from "@mui/material";

export type Props = {
    header: ReactNode
    navbar: ReactNode
    rightNavbar: ReactNode
    children: ReactNode
}
export const SimpleColumLayout = ({
                                      header,
                                      navbar,
                                      children,
                                      rightNavbar
}: Props) => {
    return (<Box sx={{ display: 'flex' }}>
        <CssBaseline />
        { navbar }
        { header }
        { children }
        { rightNavbar }
    </Box>)
}