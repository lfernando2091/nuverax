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
import {ChangeEvent, KeyboardEvent, useEffect, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SendIcon from '@mui/icons-material/Send';
import {Message, MessageData} from "./Message";
import {useTranslation} from "react-i18next";
import {useApiHelper} from "../../utils/ApiHelper";
import {aiAnalystService} from "./service/AIAnalystService";
import {ChatSkeleton} from "./skeleton/Skeleton";
import {ApiError} from "../error/Error";

export type ContextProps = {
    id: string,
    type: "space" | "document" | "page"
    title: string
}

export type AIAnalystProps = {
    context: ContextProps,
    show: boolean,
    onClose: () => void
    nameSpace?: string
}

export const AIAnalyst = ({
                              context,
                              show,
                              onClose,
                              nameSpace
                          }: AIAnalystProps) => {
    const [historyId, setHistoryId] = useState<string | null>(null)
    const { t } = useTranslation(nameSpace ?? "aiAnalystNS");
    const [question, setQuestion] = useState("")
    const [ask, setAsk] = useState(false)
    const [messages, setMessages] = useState<MessageData[]>([])
    const [initChatState, setInitChatState] = useState(false)
    const {
        history,
        conversations,
        init,
        chat
    } = aiAnalystService()

    const {
        loading: loadingInitChat,
        data: initResponse,
        error: initResponseError
    } = useApiHelper(
        () => init(context.id),
        {
            enabled: initChatState
        }
    )

    const {
        loading: loadingAiResponse,
        data: aiResponse,
        error: aiResponseError
    } = useApiHelper(
        () => chat({
            historyId: historyId!!,
            message: question!!
        }),
        {
            enabled: question !== "" && ask && historyId !== null
        }
    )

    const {
        loading: loadingConversations,
        data: conversationsList,
        error: conversationError
    } = useApiHelper(
        () => conversations(context.id),
        {
            enabled: show
        }
    )

    const {
        loading: loadingChatHistory,
        data: chatHistory,
        error: chatHistoryError
    } = useApiHelper(
        () => history(historyId!!),
        {
            enabled: historyId !== null
        }
    )

    useEffect(() => {
        if (conversationsList !== null && conversationsList.length > 0) {
            setHistoryId(conversationsList[0].shortId)
        }
    }, [conversationsList]);

    useEffect(() => {
        if (aiResponse !== null) {
            setMessages([...messages, {
                message: aiResponse.message,
                type: "ai"
            }])
            setQuestion("")
            setAsk(false)
        }
    }, [aiResponse]);

    useEffect(() => {
        if(chatHistory !== null) {
            setMessages(chatHistory.messages.map((e) => ({
                type: e.role === "assistant" ? "ai": "user",
                message: e.message,
                // sources
            })))
        }
    }, [chatHistory]);

    useEffect(() => {
        if (initResponse !== null) {
            setHistoryId(initResponse.id)
            setInitChatState(false)
        }
    }, [initResponse]);

    const onReset = () => {
        setMessages([])
        setQuestion("")
        setHistoryId(null)
        setAsk(false)
        setInitChatState(false)
    }

    const onSent = async () => {
        if (question.length > 0) {
            setAsk(true)
            setMessages([...messages, {
                message: question,
                type: "user"
            }])
            if (historyId === null) {
                setInitChatState(true)
            }
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
                                { t("title") }
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
                                    context.type === "space" ? t("context.space"):
                                        context.type === "document" ? t("context.document"): t("context.page")
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
                    {loadingChatHistory &&
                        <ChatSkeleton/>
                    }
                    {chatHistoryError &&
                        <ApiError title={t("chatLoadingError")}/>
                    }
                    {chatHistory &&
                        <>
                            {messages.map((e, i) => (
                                <Message
                                    nameSpace={nameSpace ?? "aiAnalystNS"}
                                    key={i}
                                    sources={e.sources}
                                    type={e.type}
                                    message={e.message}/>
                            ))}
                        </>
                    }
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
                        disabled={loadingAiResponse}
                        sx={{ mt: 3 }}
                        fullWidth
                        placeholder={t("questionPlaceholder")}/>

                    <List
                        sx={{
                            my: "30px",
                            bgcolor: 'background.paper'
                        }}
                        component="nav"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                { t("suggestedHdr") }
                            </ListSubheader>
                        }
                    >
                        <ListItemButton disabled={loadingAiResponse}>
                            <ListItemText primary={t("suggested.summaryOpt")} />
                        </ListItemButton>
                        <ListItemButton disabled={loadingAiResponse}>
                            <ListItemText primary={t("suggested.fiveImpPointsOpt")} />
                        </ListItemButton>
                        <ListItemButton disabled={loadingAiResponse}>
                            <ListItemText primary={`${t("suggested.suggestion")} 3`} />
                        </ListItemButton>
                        <ListItemButton disabled={loadingAiResponse}>
                            <ListItemText primary={`${t("suggested.suggestion")} 4`} />
                        </ListItemButton>
                    </List>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        { t("note") }
                    </Typography>
                </Box>
            </Drawer>
        </>
    )
}