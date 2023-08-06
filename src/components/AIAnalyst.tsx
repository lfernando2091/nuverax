import {
    Box, Button,
    Drawer, Grid,
    IconButton,
    InputAdornment,
    List, ListItemButton, ListItemText,
    ListSubheader,
    Paper,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SendIcon from '@mui/icons-material/Send';
import {Message, MessageData} from "./Message";

export type ContextProps = {
    id: string,
    type: "space" | "document" | "page"
    title: string
}

export type AIAnalystProps = {
    context: ContextProps,
    show: boolean,
    onClose: () => void
}

export const AIAnalyst = ({
                              context,
                              show,
                              onClose
                          }: AIAnalystProps) => {
    const [question, setQuestion] = useState("")
    const [messages, setMessages] = useState<MessageData[]>([])

    const onReset = () => {
        setMessages([])
        setQuestion("")
    }

    const onSent = async () => {
        if (question.length > 0) {
            setQuestion("")
            // context.id
            setMessages([...messages, {
                message: question,
                type: "user"
            }, {
                message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper augue sit amet odio vehicula euismod vel ac leo. Sed facilisis mauris vel ex ultricies, id consequat nisi blandit. Donec nec arcu rutrum, finibus lacus quis, eleifend nunc. Pellentesque interdum porta libero non mattis. Integer elementum quis turpis non blandit.",
                type: "ai",
                sources: [
                    { name: "doc_abc.pdf", id: "abc1" },
                    { name: "doc_abc_cjcjc.pdf", id: "abc2" }
                ]
            }])
        }
    }

    const onCloseDrawer = () => {
        onReset()
        onClose()
    }

    const onKeyEnter = async (ev: KeyboardEvent<HTMLImageElement>) => {
        if (ev.key === "Enter") {
            await onSent()
        }
    }

    return (
        <>
            <Drawer
                variant="temporary"
                onClose={onCloseDrawer}
                open={show}
                anchor="right">
                <Toolbar variant="dense"/>
                <Paper variant="outlined"
                       sx={{
                           minWidth: "500px",
                           padding: "10px 20px",
                           backgroundColor: (theme) =>
                               theme.palette.mode === 'light'
                                   ? theme.palette.grey[200]
                                   : theme.palette.grey[800],
                }}
                       square>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item>
                            <IconButton size="small" onClick={onCloseDrawer} >
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography
                                sx={{ marginTop: "10px", marginBottom: "10px" }}
                                variant="h6"
                                component="h3">
                                AI Analyst
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                { `${
                                    context.type === "space" ? "Space •":
                                        context.type === "document" ? "Document •": "Page •"
                                } ${context.title}` }
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton size="small" onClick={onReset} >
                                <RestartAltIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
                <Box component="div" sx={{
                    overflowY: "auto",
                    overflowX: "hidden",
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    px: 3,
                    pb: 3
                }}>
                    {messages.map((e, i) => (
                        <Message
                            key={i}
                            sources={e.sources}
                            type={e.type}
                            message={e.message}/>
                    ))}
                    <TextField
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <AutoAwesomeIcon />
                            </InputAdornment>,
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={onSent} size="small">
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        }}
                        value={question}
                        onKeyDown={onKeyEnter}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setQuestion(event.target.value);
                        }}
                        sx={{ mt: 3 }}
                        fullWidth
                        placeholder="Ask any question related to your data..."/>

                    <List
                        sx={{
                            my: "30px",
                            bgcolor: 'background.paper'
                        }}
                        component="nav"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Suggested
                            </ListSubheader>
                        }
                    >
                        <ListItemButton>
                            <ListItemText primary={"Summary"} />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary={"5 important points"} />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary={"Suggestion 3"} />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary={"Suggestion 4"} />
                        </ListItemButton>
                    </List>

                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        AI Analyst is currently in alpa version.
                    </Typography>
                </Box>
            </Drawer>
        </>
    )
}