import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    Collapse, IconButton,
    IconButtonProps, styled,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import PersonIcon from '@mui/icons-material/Person';
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export type MessageProps = {
    type: "ai" | "user"
    message: string
    nameSpace: string
    sources?: string[]
}

export type MessageData = {
    type: "ai" | "user"
    message: string
    sources?: string[]
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}))

export const Message = ({
                            type,
                            message,
                            sources,
                            nameSpace
                        }: MessageProps) => {
    const { t } = useTranslation(nameSpace);
    const [expanded, setExpanded] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const onSelectSource = () => {

    }

    return (<>
        <Card square variant="outlined"
        sx={{ overflow: "unset", mt: 3 }}>
            <CardHeader
                avatar={
                    <Avatar variant="square" color="primary">
                        { type === "ai" ? <AutoAwesomeIcon/>: <PersonIcon/> }
                    </Avatar>
                }
                subheader={<Typography
                    sx={{
                        inlineSize: "340px",
                        overflowWrap: "break-word"
                    }}
                    variant="body2"
                    color="text.secondary">
                    {message}
                </Typography>}
                title={
                    <Typography variant="body1" component="h3">
                        {type === "ai" ? t("message.titleAI"): t("message.titleUser")}
                    </Typography>
                }
            />
            {sources &&
                <>
                    <CardActions disableSpacing>
                        <Chip
                            sx={{ mx: "3px" }}
                            label={`${sources.length} ${t("message.sources")}`}
                            size="small"/>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            {sources.map((e, i) => (
                                <Chip key={i}
                                      sx={{ mx: "3px" }}
                                      onClick={onSelectSource}
                                      label={e}
                                      size="small"
                                      variant="outlined"/>
                            ))}
                        </CardContent>
                    </Collapse>
                </>
            }
        </Card>
    </>)
}