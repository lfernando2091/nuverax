import {
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    CircularProgress,
    Grid,
    Paper,
    Typography,
    useTheme
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import {useTranslation} from "react-i18next";
import {useState, DragEvent, useRef, ChangeEvent, useEffect} from "react";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export type DragAndDropInputProps = {
    multi?: boolean
    accept?: string[]
    service?: UploadService
}

type FileData = {
    name: string
    size: number
}

type UploadTask = {
    id: number
    file: File | FileData
    loading?: boolean
}

export interface UploadService {
    upload: (data: UploadTask) => Promise<number>
}
const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
const defaultService = (): UploadService => {

    const upload = async (data: UploadTask) => {
        console.log("Echo " + data)
        await delay(5000)
        return data.id
    }

    return {
        upload
    }
}

const maxTask = 4
export const DragAndDropInput = ({
                                     multi = true,
                                     accept = ["application/pdf"],
                                     service = defaultService()
                                 }: DragAndDropInputProps) => {

    const [dragActive, setDragActive] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const [files, setFiles] = useState<UploadTask[]>([])
    const fileQueue = useRef<UploadTask[]>([])
    const acceptedTypes = useRef<Set<string>>(new Set(accept))

    const onDrag = (e: DragEvent<HTMLFormElement | HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }

    const runUpload = async () => {
        while (fileQueue.current.length > 0) {
            const chunk = fileQueue.current.splice(0, maxTask)
            const taskToDo = chunk
                .map((e, i) => service?.upload(e))
            const res = await Promise.all(taskToDo)
            const setRes = new Set(res)
            const filesRemain = files.map((e) => {
                if (setRes.has(e.id)) {
                    e.loading = false
                }
                return e
            })
            setFiles(filesRemain)
        }
    }

    const onUploadFiles = (files: FileList) => {
        setFiles([])
        fileQueue.current = []
        let fileArray: UploadTask[] = []
        let fileQueueArray: UploadTask[] = []
        for (let i = 0; i < files.length; i++) {
            const file = files.item(i)
            if (file && acceptedTypes.current.has(file.type)) {
                fileArray.push({
                    id: i,
                    file: {
                        name: file.name,
                        size: file.size
                    },
                    loading: true
                })
                fileQueueArray.push({
                    id: i,
                    file: file
                })
            }
        }
        setFiles(fileArray)
        fileQueue.current = fileQueueArray
    }

    useEffect(() => {
        if (fileQueue.current.length > 0) {
            runUpload().then()
        }
    }, [fileQueue.current]);

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onUploadFiles(e.dataTransfer.files);
        }
    }

    const onChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            onUploadFiles(e.target.files);
        }
    }

    const onClick = () => {
        if (inputRef.current !== null) {
            inputRef.current!!.click()
        }
    }

    const { t } = useTranslation("spaceNS");
    const theme = useTheme()

    return (<>
        <Paper
            sx={{ marginBottom: "30px" }}
            variant="outlined" square>
            <form style={{
                height: "16rem",
                width: "100%",
                maxWidth: "100%",
                textAlign: "center",
                position: "relative"
            }} onDragEnter={onDrag}
                  onSubmit={(e) => e.preventDefault()}>
                <input
                    onChange={onChangeFiles}
                    ref={inputRef}
                    style={{ display: "none" }}
                    type="file"
                    accept={accept?.join(", ")}
                    multiple={multi} />
                <label
                    htmlFor="input-file-upload"
                    style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: dragActive ? theme.palette.secondary.light: theme.palette.background.default
                    }}>
                    <div>
                        <Typography sx={{ marginTop: "10px", marginBottom: "10px" }}>
                            { t("dragAndDropFilesTitle") }
                        </Typography>
                        <Button variant="outlined"
                                onClick={onClick}
                                disableElevation
                                startIcon={<UploadIcon />}>
                            { t("uploadBtn") }
                        </Button>
                    </div>
                </label>
                { dragActive && <div id="drag-file-element"
                                     style={{
                                         position: "absolute",
                                         width: "100%",
                                         height: "100%",
                                         top: "0px",
                                         right: "0px",
                                         bottom: "0px",
                                         left: "0px"
                                     }}
                                     onDragEnter={onDrag}
                                     onDragLeave={onDrag}
                                     onDragOver={onDrag}
                                     onDrop={onDrop}></div> }
            </form>
        </Paper>
        {files && files.length > 0 &&
            <>
                <Grid container spacing={2}>
                    {/* @ts-ignore */}
                    {files.map(
                        (e, i) => (
                            <Grid key={i} item xs={12} md={6}>
                                <FileInfo file={e.file} uploading={e.loading}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </>
        }
    </>)
}

type FileInfoProps = {
    file: FileData,
    uploading?: boolean
}

const FileInfo = ({ file, uploading }: FileInfoProps) => {
    const theme = useTheme()
    const fileSize = (size: number): string => {
        if (size < 1024) {
            return `${size} bytes`;
        } else if (size >= 1024 && size < 1048576) {
            return `${(size / 1024).toFixed(1)} KB`;
        } else if (size >= 1048576) {
            return `${(size / 1048576).toFixed(1)} MB`;
        }
        return "0"
    }
    return (<>
        <Card>
            <CardHeader
                avatar={
                    <Box sx={{ position: 'relative' }}>
                        <Avatar sx={{ bgcolor: uploading ? theme.palette.secondary.main: theme.palette.primary.main }}>
                            {uploading ? <UploadIcon/>: <InsertDriveFileIcon/>}
                        </Avatar>
                        {uploading &&
                            <CircularProgress
                                size={50}
                                sx={{
                                    color: theme.palette.secondary.main,
                                    position: 'absolute',
                                    top: -5,
                                    left: -5,
                                    zIndex: 1,
                                }}
                            />
                        }
                    </Box>
                }
                title={<div style={{
                    overflowWrap: "anywhere",
                    // wordWrap: "break-word",
                    hyphens: "auto"
                }}>
                    { file.name }
                </div>}
                subheader={<>
                    { fileSize(file.size) }
                </>}
            />
        </Card>
    </>)
}