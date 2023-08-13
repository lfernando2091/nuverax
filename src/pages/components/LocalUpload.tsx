import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import {useTranslation} from "react-i18next";
import {DragAndDropInput, ExtraProps, UploadService} from "./DragAndDropInput";
import {useState} from "react";

export type CloseResult = {
    shouldUpdate: boolean
}

export type LocalUploadProps = {
    show: boolean
    multi?: boolean
    accept?: string[]
    service?: UploadService,
    extra: ExtraProps
    onClose: (res?: CloseResult) => void
}

export const LocalUpload = ({
                                show,
                                multi = true,
                                onClose,
                                accept,
                                service,
                                extra
                            }: LocalUploadProps) => {
    const { t } = useTranslation("spaceNS");
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const onCloseDialog = () => {
        onClose({
            shouldUpdate
        })
    }

    const onShouldUpdate = () => {
        setShouldUpdate(true)
    }

    return (<>
        <Dialog open={show} onClose={onCloseDialog}>
            <DialogTitle>
                { t("localfileTitle") }
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    { t("localfileDescription") }
                </DialogContentText>
                <DragAndDropInput
                    onShouldUpdate={onShouldUpdate}
                    extra={extra}
                    service={service}
                    accept={accept}
                    multi={multi}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseDialog}>
                    { t("closeBtn") }
                </Button>
            </DialogActions>
        </Dialog>
    </>)
}