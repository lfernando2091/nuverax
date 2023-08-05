import {Avatar, Card, CardContent, CardHeader, Chip, Typography} from "@mui/material";

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

export const Message = ({
                            type,
                            message,
                            sources
                        }: MessageProps) => {
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
            }
        </Card>
    </>)
}