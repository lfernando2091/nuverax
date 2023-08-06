import {SyntheticEvent, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Grid,
    Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeleteIcon from '@mui/icons-material/Delete';
import {Page} from "./Page";
import {AIAnalyst} from "../../../components/AIAnalyst";

type PageData = {
    text: string
}

const pages: PageData[] = [
    { text: "Page 1"  },
    { text: "Page 2"  },
    { text: "Page 3"  }
]

export const Document = () => {
    const [expanded, setExpanded] = useState<string | false>("panel1")
    const params = useParams()
    const [showAiAnalyst, setShorAiAnalyst] = useState(false)

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        }

    const onAiAnalyst = () => {
        setShorAiAnalyst(true)
    }

    const onClose = () => {
        setShorAiAnalyst(false)
    }

    return (<>
        <Typography sx={{ marginTop: "10px", marginBottom: "10px" }} variant="h6" component="h3">
            Document {params["id"]}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            file-abc.txt
        </Typography>
        <Grid container
              sx={{ marginTop: "10px", marginBottom: "10px" }}
              spacing={2}>
            <Grid item xs={6} md={4}>
                <Button variant="outlined"
                        color="secondary"
                        fullWidth
                        disableElevation
                        onClick={onAiAnalyst}
                        sx={{
                            borderRadius: "0px",
                            paddingTop: "10px",
                            paddingBottom: "10px"
                        }}
                        startIcon={<AutoAwesomeIcon />}>
                    AI Document Analyst
                </Button>
            </Grid>
            <Grid item xs={6} md={4}>
                <Button variant="outlined"
                        color="inherit"
                        fullWidth
                        disableElevation
                        sx={{
                            borderRadius: "0px",
                            paddingTop: "10px",
                            paddingBottom: "10px"
                        }}
                        startIcon={<DeleteIcon />}>
                    Add Signer
                </Button>
            </Grid>
            <Grid item xs={6} md={4}>
                <Button variant="outlined"
                        color="inherit"
                        fullWidth
                        disableElevation
                        sx={{
                            borderRadius: "0px",
                            paddingTop: "10px",
                            paddingBottom: "10px"
                        }}
                        startIcon={<DeleteIcon />}>
                    Delete
                </Button>
            </Grid>
        </Grid>
        <Accordion expanded={expanded === 'panel1'}
                   square
                   variant="outlined"
                   onChange={handleChange('panel1')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    Pages
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    {pages.length}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container
                      sx={{ marginTop: "10px", marginBottom: "10px" }}
                      spacing={2}>
                    {pages.map((e, i) => (
                        <Grid item xs={6} md={4}>
                            <Page key={i} pageNumber={i + 1} pageTitle={e.text}/>
                        </Grid>
                    ))}
                </Grid>
            </AccordionDetails>
        </Accordion>
        <AIAnalyst
            context={{
                title: params["id"] ?? "0",
                type: "document",
                id: "0"
            }}
            show={showAiAnalyst}
            onClose={onClose}/>
    </>)
}