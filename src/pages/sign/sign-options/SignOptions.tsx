import {Box, Grid, IconButton, LinearProgress, Tab, Tabs, Tooltip, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useState, SyntheticEvent, ReactNode, Suspense, lazy} from "react";
import LockIcon from '@mui/icons-material/Lock';
import {useTranslation} from "react-i18next";

const DrawSignature =
    lazy(() => import('./option/DrawSignature')
        .then(({ DrawSignature }) => ({ default: DrawSignature })))
const FontSignature =
    lazy(() => import('./option/FontSignature')
        .then(({ FontSignature }) => ({ default: FontSignature })))
const UploadSignature =
    lazy(() => import('./option/UploadSignature')
        .then(({ UploadSignature }) => ({ default: UploadSignature })))
const OtherSignature =
    lazy(() => import('./option/OtherSignature')
        .then(({ OtherSignature }) => ({ default: OtherSignature })))

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
    const { t } = useTranslation("signNS");
    const params = useParams()
    const navigate = useNavigate()
    const [tab, setTab] = useState(0)
    const [searchParams, _] = useSearchParams()
    const token = searchParams.get("t")

    const onBack = () => {
        navigate(`/sign?t=${token}`)
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
                        { t("signingOptionsTxt") }
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ fontSize: "10px", borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={onChangeTab}>
                    <Tab label={t("drawSignatureTxt")} {...a11yProps(0)}/>
                    <Tooltip arrow
                             title={<>
                                 <Typography color="inherit">{t("tabUnderDevelop")}</Typography>
                             </>}>
                        <span>
                            <Tab label={t("fontTxt")}
                                 disabled
                                 icon={<LockIcon />}
                                 iconPosition="start"
                                 {...a11yProps(1)}/>
                        </span>
                    </Tooltip>
                    <Tab label={t("uploadFileTxt")}
                         disabled
                         icon={<LockIcon />}
                         iconPosition="start"
                         {...a11yProps(2)}/>
                    <Tab label={t("othersTxt")}
                         disabled
                         icon={<LockIcon />}
                         iconPosition="start" {...a11yProps(3)}/>
                </Tabs>
            </Box>
            <SuspenseTabPanel value={tab} index={0}>
                <DrawSignature/>
            </SuspenseTabPanel>
            <SuspenseTabPanel value={tab} index={1}>
                <FontSignature/>
            </SuspenseTabPanel>
            <SuspenseTabPanel value={tab} index={2}>
                <UploadSignature/>
            </SuspenseTabPanel>
            <SuspenseTabPanel value={tab} index={3}>
                <OtherSignature/>
            </SuspenseTabPanel>
        </Box>
    </>)
}