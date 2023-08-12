import {Skeleton} from "@mui/material";

export const NavDocumentsListSkeleton = () => {
    return (<>
        <Skeleton sx={{ marginBottom: "10px" }} variant="rectangular" height={30} />
        <Skeleton sx={{ marginBottom: "10px" }} variant="rectangular" height={30} />
        <Skeleton sx={{ marginBottom: "10px" }} variant="rectangular" height={30} />
        <Skeleton sx={{ marginBottom: "10px" }} variant="rectangular" height={30} />
    </>)
}

export const SpaceSkeleton = () => {
    return (<>
        <Skeleton sx={{ marginBottom: "10px" }} variant="rectangular" height={40} />
        <Skeleton sx={{ marginBottom: "10px" }} variant="rectangular" height={20} />
    </>)
}