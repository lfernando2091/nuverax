import {RecipientItem, RecipientType} from "../../models/RecipientModel";
import {ChangeEvent, useState} from "react";
import {useTranslation} from "react-i18next";
import {
    FormControl, FormHelperText,
    Grid,
    IconButton,
    InputLabel, MenuItem,
    OutlinedInput,
    Paper, Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

type SelectOption = {
    name: string
    value: RecipientType
}

export type RecipientInputProps = {
    index: number
    isEditingContent?: boolean
    value: RecipientItem
    onUpdateRecipient: (value: RecipientItem) => void
    onRemove: (value: RecipientItem) => void
}

const listOptions: SelectOption[] = [
    { name: "signatureRequiredOpt", value: RecipientType.REQUIRES_SIGNATURE },
    { name: "ccOpt", value: RecipientType.COPY }
]

export const RecipientInput = ({
                            index = 0,
                            value,
                            onUpdateRecipient,
                            onRemove,
                            isEditingContent = false
                        }: RecipientInputProps) => {
    const [content, setContent] = useState<RecipientItem>(value)
    const [isEditing, setIsEditing] = useState(isEditingContent)
    const { t } = useTranslation("spaceNS");
    const onChangeType = (event: SelectChangeEvent) => {
        const strVal = event.target.value as string
        setContent({
            ...content,
            type: strVal as RecipientType
        })
    }
    const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setContent({
            ...content,
            fullName: event.target.value
        })
    }
    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setContent({
            ...content,
            email: event.target.value
        })
    }
    const onEdit = () => {
        setIsEditing(true)
    }
    const onCancelEdit = () => {
        if (content.isNew) {
            onRemove(content)
        } else {
            setContent(value)
            setIsEditing(false)
        }
    }
    const onSaveChanges = () => {
        if (content.fullName !== "" && content.email !== "") {
            setIsEditing(false)
            if (content.fullName !== value.fullName || content.email !== value.email) {
                // setContent({
                //     ...content,
                //     isNew: false
                // })
                onUpdateRecipient(content)
            }
        }
    }
    return (<>
        <Paper sx={{ p: "10px" }} variant={isEditing ? "elevation": "outlined"} square>
            <Grid
                spacing={1}
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item>
                    <Typography sx={{ marginTop: "10px", marginBottom: "10px" }} variant="h6" component="h4">
                        {t("recipientLbl")}{" " + (index + 1)} {isEditing ? "*": ""}
                    </Typography>
                </Grid>
                <Grid item>
                    {!isEditing &&
                        <>
                            <IconButton size="small" onClick={() => onRemove(content)} >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton size="small" onClick={onEdit} >
                                <EditIcon />
                            </IconButton>
                        </>
                    }
                    {isEditing &&
                        <>
                            <IconButton size="small" onClick={onSaveChanges} >
                                <SaveIcon />
                            </IconButton>
                            <IconButton size="small" onClick={onCancelEdit} >
                                <CloseIcon />
                            </IconButton>
                        </>
                    }
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <FormControl fullWidth size="small">
                        <InputLabel htmlFor={`input-email-${content.id}`}>{t("emailLbl")}</InputLabel>
                        <OutlinedInput
                            disabled={!isEditing}
                            type="email"
                            id={`input-email-${content.id}`}
                            value={content.email}
                            autoComplete="email"
                            onChange={onChangeEmail}
                            placeholder={t("emailPlaceholder")}
                            label={t("emailLbl")}
                        />
                        <FormHelperText>
                            { t("emailInputHelper")}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel id={`lbl-recipient-type-${content.id}`}>{t("recipientType")}</InputLabel>
                        <Select
                            disabled={!isEditing}
                            labelId={`lbl-recipient-type-${content.id}`}
                            value={content.type}
                            label={t("recipientType")}
                            onChange={onChangeType}
                        >
                            {listOptions.map((e, i) => (
                                <MenuItem key={i} value={e.value}>{t(e.name)}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>
                            { t("recipientInputHelper")}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={8}>
                    <FormControl fullWidth size="small">
                        <InputLabel htmlFor={`input-name-${content.id}`}>{t("fullNameLbl")}</InputLabel>
                        <OutlinedInput
                            disabled={!isEditing}
                            type="text"
                            autoComplete="name"
                            id={`input-name-${content.id}`}
                            placeholder="Fernando Abc Xyz"
                            label={t("fullNameLbl")}
                            value={content.fullName}
                            onChange={onChangeName}
                        />
                        <FormHelperText>
                            { t("fullNameInputHelper")}
                        </FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    </>)
}