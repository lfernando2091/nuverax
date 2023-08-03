import {Skeleton} from "@mui/material";

export const SubMenu1Skeleton = () => {
    return (<>
        <Skeleton variant="circular" sx={{ marginBottom: "5px" }} width={40} height={40} />
        <Skeleton variant="rectangular" sx={{ marginBottom: "5px" }} height={40} />
        <Skeleton variant="rectangular" sx={{ marginBottom: "5px" }} height={40} />
    </>)
}

export const SubMenu2Skeleton = () => {
    return (<>
        <Skeleton variant="rectangular" sx={{ marginBottom: "5px" }} height={40} />
        <Skeleton variant="rectangular" sx={{ marginBottom: "5px" }} height={40} />
    </>)
}