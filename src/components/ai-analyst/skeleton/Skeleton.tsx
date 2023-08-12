import {Skeleton} from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export const ChatSkeleton = () => {
    return (<div>
        <Card variant="outlined" sx={{
            marginTop: "50px",
            marginBottom: "10px"
        }} square>
            <CardHeader
                avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
                title={<Skeleton
                    animation="wave"
                    height={30}
                    style={{ marginBottom: 6 }}
                />}
                subheader={
                    <>
                        <Skeleton animation="wave" height={20}/>
                        <Skeleton animation="wave" height={20}/>
                    </>
                }
            />
        </Card>
    </div>)
}

export const AIWaitingSkeleton = () => {
    return (<div>
        <Card variant="outlined" sx={{
            marginTop: "20px",
            marginBottom: "10px"
        }} square>
            <CardHeader
                avatar={<AutoAwesomeIcon color="primary"/>}
                title={<Skeleton
                    animation="wave"
                    height={30}
                    style={{ marginBottom: 6 }}
                />}
                subheader={
                    <>
                        <Skeleton animation="wave" height={20}/>
                        <Skeleton animation="wave" height={20}/>
                    </>
                }
            />
        </Card>
    </div>)
}