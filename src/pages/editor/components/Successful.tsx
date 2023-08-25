import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export type SuccessfulModalProps = {
    open: boolean
    onClose: () => void
}

export const SuccessfulModal = ({
                                    open,
                                    onClose
                                }: SuccessfulModalProps) => {

    const onCloseDialog = () => {
        onClose()
    }

    return (<>
        <Dialog
            disableEscapeKeyDown
            open={open}
            onClose={onCloseDialog}
        >
            <DialogTitle>
                Successful request
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    We will notify recipients about your request.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseDialog} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    </>)
}