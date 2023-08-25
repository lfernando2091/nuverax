import {useEffect, useState} from "react";
import {RecipientItem, RecipientType} from "../../models/RecipientModel";
import {Accordion, AccordionDetails, AccordionSummary, Alert, Button, Grid, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {RecipientInput} from "./RecipientInput";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {useTranslation} from "react-i18next";
import {recipientService} from "../../services/RecipientService";
import {useParams} from "react-router-dom";

export type RecipientLayoutProps = {
    recipients: RecipientItem[]
    onCountRecipients?: (value: number) => void
}

const newEmptyRecipient: RecipientItem =
    { id: "", fullName: "", email: "", type: RecipientType.REQUIRES_SIGNATURE, isNew: true }

const randomChars = (size: number = 7) => (Math.random() + 1).toString(36).substring(size)

export const RecipientLayout = ({
                                    recipients = [],
                                    onCountRecipients
                                }: RecipientLayoutProps) => {
    const params = useParams()
    const recipientServ = recipientService()
    const MAX_RECIPIENTS = 5
    const { t } = useTranslation("spaceNS");
    const [showRecipients, setShowRecipients] = useState(false)
    const [recipientsList, setRecipients] =
        useState<RecipientItem[]>(recipients)
    const onShowRecipients = () => {
        setShowRecipients(!showRecipients)
    }
    const onRemoveItem = async (value: RecipientItem) => {
        if (!value.isNew) {
            await recipientServ.del(value.id)
        }
        setRecipients(recipientsList.filter((e) => e.id !== value.id))
    }

    const addNewRecipient = () => {
        if (recipientsList.length < MAX_RECIPIENTS) {
            setRecipients([...recipientsList, {
                ...newEmptyRecipient,
                id: randomChars()
            }])
        }
    }

    const onUpdateRecipient = async (newValue: RecipientItem) => {
        if (newValue.isNew) {
            const res = await recipientServ.create({
                spaceId: params.idSpace!!,
                email: newValue.email,
                type: newValue.type,
                fullName: newValue.fullName
            })
            newValue.isNew = false
            newValue.id = res.id
        } else {
            await recipientServ.update(newValue.id,{
                email: newValue.email,
                fullName: newValue.fullName,
                type: newValue.type
            })
        }
        setRecipients(recipientsList.map((e) => e.id === newValue.id ? newValue : e))
    }

    useEffect(() => {
        if (onCountRecipients) {
            onCountRecipients(recipientsList.length)
        }
    }, [recipientsList]);

    return (<>
        <Accordion expanded={showRecipients}
                   square
                   onChange={onShowRecipients}
                   variant="outlined">
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    { t("recipientsHeader") }
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    { recipientsList.length }
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container
                      sx={{ marginTop: "10px", marginBottom: "10px" }}
                      spacing={2}>
                    <Grid item xs={12}>
                        {recipientsList.length === 0 &&
                            <Alert severity="info">
                                {t("emptyRecipients")}
                            </Alert>
                        }
                        {recipientsList.map((e, i) => (
                            <RecipientInput
                                key={e.id}
                                index={i}
                                value={e}
                                isEditingContent={e.isNew}
                                onRemove={onRemoveItem}
                                onUpdateRecipient={onUpdateRecipient}/>
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Button size="small" fullWidth startIcon={<PersonAddIcon />}
                                onClick={addNewRecipient}>
                            { t("addRecipientBtn") }
                        </Button>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    </>)
}