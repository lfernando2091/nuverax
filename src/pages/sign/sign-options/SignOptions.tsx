import {Box, Grid, IconButton, LinearProgress, Tab, Tabs, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate, useParams} from "react-router-dom";
import {useState, SyntheticEvent, ReactNode, Suspense, lazy} from "react";

const DrawSignature =
    lazy(() => import('./option/DrawSignature')
        .then(({ DrawSignature }) => ({ default: DrawSignature })))
const FontSignature =
    lazy(() => import('./option/FontSignature')
        .then(({ FontSignature }) => ({ default: FontSignature })))

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

const a11yProps = (index: number) => ({
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
})

const SuspenseTabPanel = ({
                            value,
                            index,
                            children,
                            ...other
                        }: TabPanelProps) => (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
    >
        {value === index && (
            <>
                <Suspense fallback={
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                }>
                    {children}
                </Suspense>
            </>
        )}
    </div>
)

export const SignOptions = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [tab, setTab] = useState(0)

    const onBack = () => {
        navigate(`/sign/${params["id"]}`)
    }

    const onChangeTab = (event: SyntheticEvent, newValue: number) => {
        setTab(newValue);
    }

    return (<>
        <Box component="div" sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '85vh',
            flexGrow: 1,
            p: 3
        }}>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
            >
                <Grid item>
                    <IconButton
                        onClick={onBack}
                        size="small">
                        <ArrowBackIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography sx={{ marginTop: "10px", marginBottom: "10px" }} variant="h6" component="h3">
                        Signing Options
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ fontSize: "10px", borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={onChangeTab}>
                    <Tab label="Draw Signature" {...a11yProps(0)}/>
                    <Tab label="Fonts" {...a11yProps(1)}/>
                    <Tab label="Upload File" {...a11yProps(2)}/>
                    <Tab label="Others" {...a11yProps(3)}/>
                </Tabs>
            </Box>
            <SuspenseTabPanel value={tab} index={0}>
                <DrawSignature/>
            </SuspenseTabPanel>
            <SuspenseTabPanel value={tab} index={1}>
                <FontSignature/>
            </SuspenseTabPanel>
            <SuspenseTabPanel value={tab} index={2}>
                Item 3
            </SuspenseTabPanel>
            <SuspenseTabPanel value={tab} index={3}>
                Item 4
            </SuspenseTabPanel>
        </Box>
    </>)
}