import React, {ReactNode} from "react";
import {CssBaseline, Box} from "@mui/material";

export type Props = {
    header: ReactNode
    navbar: ReactNode
    children: ReactNode
}
export const SimpleColumLayout = ({
                                      header,
                                      navbar,
                                      children
}: Props) => {
    return (<Box sx={{ display: 'flex' }}>
        <CssBaseline />
        { navbar }
        { header }
        { children }
    </Box>)
}