import {ReactNode, useState} from "react";
import {useApiHelper} from "../../utils/ApiHelper";
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress} from "@mui/material";
import {ApiError} from "../error/Error";

export type DeleteDialogProps<R = any> = {
    show: boolean
    title: ReactNode
    description: ReactNode
    errorText?: string
    successText?: string
    cancelText?: string
    confirmText?: string
    closeText?: string
    onClose: (shouldUpdate?: boolean) => void
    fun:() => Promise<R>
}

export const ConfirmDialog = <R = any, E = any>({
                                                    show,
                                                    onClose,
                                                    title,
                                                    description,
                                                    errorText = "Error",
                                                    successText = "Success",
                                                    cancelText = "Cancel",
                                                    confirmText = "Confirm",
                                                    closeText = "Close",
                                                    fun
                                                }: DeleteDialogProps<R>) => {
    const [start, setStart] = useState(false)

    const {
        loading,
        data,
        error
    } = useApiHelper<R, E>(
        fun,
        {
            enabled: start
        }
    )

    const onCloseDialog = (e: any, reason: "backdropClick" | "escapeKeyDown") => {
        if (loading) {
            if (reason !== "backdropClick") {
                onNormalClose()
            }
        } else if (data){
            onSuccessClose()
        } else {
            onNormalClose()
        }
    }

    const onConfirmAction = () => {
        setStart(true)
    }

    const onNormalClose = () => {
        setStart(false)
        onClose()
    }

    const onSuccessClose = () => {
        setStart(false)
        onClose(true)
    }

    return (<>
        <Dialog keepMounted={true} disableEscapeKeyDown={loading} open={show} onClose={onCloseDialog}>
            <DialogTitle>
                { title }
            </DialogTitle>
            <DialogContent>
                { description }
                {loading &&
                    <LinearProgress />
                }
                {data &&
                    <Alert severity="success">{ successText }</Alert>
                }
                {error &&
                    <>
                        <ApiError title={ errorText }/>
                    </>
                }
            </DialogContent>
            <DialogActions>
                {data &&
                    <Button onClick={onSuccessClose}>
                        { closeText }
                    </Button>
                }
                {data === null &&
                    <>
                        <Button disabled={loading} onClick={() => onNormalClose()}>
                            { cancelText }
                        </Button>
                        {error === undefined &&
                            <Button disabled={loading} variant="outlined" onClick={onConfirmAction}>
                                { confirmText }
                            </Button>
                        }
                    </>
                }
            </DialogActions>
        </Dialog>
    </>)
}