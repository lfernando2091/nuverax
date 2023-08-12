import {Button, Paper, Typography, useTheme} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import {useTranslation} from "react-i18next";
import {useState, DragEvent, useRef, ChangeEvent} from "react";

export type DragAndDropInputProps = {
    multi?: boolean
    accept?: string
}


export const DragAndDropInput = ({
                                     multi = true,
                                     accept = "application/pdf"
                                 }: DragAndDropInputProps) => {

    const [dragActive, setDragActive] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const onDrag = (e: DragEvent<HTMLFormElement | HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }

    const onUploadFiles = (files: FileList) => {
        for (let i = 0; i < files.length; i++) {
            console.log(`file ${i}: `, files.item(i))
        }
    }

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

    const { t } = useTranslation("spaceNS");
    const theme = useTheme()
    return (<>
        <Paper variant="outlined" square>
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
                    accept={accept}
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
    </>)
}