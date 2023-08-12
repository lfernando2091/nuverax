import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import {useTranslation} from "react-i18next";
import {DragAndDropInput} from "./DragAndDropInput";

export type LocalUploadProps = {
    show: boolean
    multi?: boolean
    onClose: () => void
}

export const LocalUpload = ({
                                show,
                                multi = true,
                                onClose
                            }: LocalUploadProps) => {
    const { t } = useTranslation("spaceNS");
    const onCloseDialog = () => {
        onClose()
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
                <DragAndDropInput multi={multi}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseDialog}>
                    { t("cancelBtn") }
                </Button>
            </DialogActions>
        </Dialog>
    </>)
}