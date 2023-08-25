import {Skeleton} from "@mui/material";

export const EditorTitleSkeleton = () => {
    return (<>
        <Skeleton sx={{ marginBottom: "20px" }} variant="rectangular" height={40} />
        <Skeleton sx={{ marginBottom: "10px" }} variant="rectangular" height={20} />
    </>)
}