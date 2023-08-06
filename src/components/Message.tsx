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

export type Source = {
    name: string,
    id: string
}

export type MessageProps = {
    type: "ai" | "user"
    message: string
    sources?: Source[]
}

export type MessageData = {
    type: "ai" | "user"
    message: string
    sources?: Source[]
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
                            sources
                        }: MessageProps) => {
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
                    <Avatar>
                        { type === "ai" ? "AI": "U" }
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
                        {type === "ai" ? "Assistant": "User"}
                    </Typography>
                }
            />
            {sources &&
                <>
                    <CardActions disableSpacing>
                        <Chip
                            sx={{ mx: "3px" }}
                            label="3 sources"
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
                                      label={e.name}
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