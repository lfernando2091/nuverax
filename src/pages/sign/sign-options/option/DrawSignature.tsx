import {Box, Button, Grid, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {Layer, Stage, Line } from "react-konva";
import Konva from "konva"
import { If } from "../../../../components/common/IfStatement";
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useTranslation} from "react-i18next";
import {useSignContext} from "../../SignContext";

type LineDef = {
    points: number[]
    tool?: string
}

type DrawAreaProps = {
    parent: HTMLDivElement
    save: boolean
    onSave: (raw: Blob) => void
    onClearLines?: () => void
    clearLines?: boolean,
    pencilType: string
}

const DrawArea = ({
                      parent,
                      save,
                      onSave,
                      clearLines,
                      onClearLines,
                      pencilType
}: DrawAreaProps) => {
    const [lines, setLines] = useState<LineDef[]>([])
    const isDrawing = useRef(false)
    const stage = useRef<Konva.Stage>(null)
    const layer = useRef<Konva.Layer>(null)
    useEffect(() => {
        if (clearLines) {
            if(layer.current) {
                setLines([])
                layer.current.clear()
                if(onClearLines) {
                    onClearLines()
                }
            }
        }
    }, [clearLines])

    const exportImage = async (stage: Konva.Stage) => {
        const blob = await stage.toBlob({ mimeType: "image/png", pixelRatio: 2 }) as Blob
        // const base64Img = stage.toDataURL({ mimeType: "image/png", pixelRatio: 2 })
        onSave(blob)
    }

    useEffect(() => {
        if (save) {
            if(stage.current) {
                exportImage(stage.current).then()
            }
        }
    }, [save])

    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
        isDrawing.current = true;
        if (e.target.getStage() !== null) {
            const pos = e.target.getStage()?.getPointerPosition();
            if (pos) {
                setLines([...lines, { points: [pos.x, pos.y], tool: pencilType }]);
            }
        }
    }

    const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
        // no drawing - skipping
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        if (stage) {
            const point = stage.getPointerPosition();

            // To draw line
            let lastLine = lines[lines.length - 1];

            if(lastLine && point) {
                // add point
                lastLine.points = lastLine.points.concat([point.x, point.y]);

                // replace last
                lines.splice(lines.length - 1, 1, lastLine);
                setLines(lines.concat());
            }
        }
    }

    const handleMouseUp = () => {
        isDrawing.current = false;
    }

    return (<>
        <Stage ref={stage} width={parent.clientWidth}
               height={parent.clientHeight}
               onMouseDown={handleMouseDown}
               onMousemove={handleMouseMove}
               onMouseup={handleMouseUp}
               onTouchStart={handleMouseDown}
               onTouchMove={handleMouseMove}
               onTouchEnd={handleMouseUp}
               className="canvas-draw-stage">
            <Layer ref={layer} className="canvas-draw-layer">
                {lines.map((line, i) => (
                    <Line
                        key={i}
                        points={line.points}
                        stroke="#292929"
                        strokeWidth={6}
                        tension={0.5}
                        lineCap="round"
                        globalCompositeOperation={
                            line.tool === 'eraser' ? 'destination-out' : 'source-over'
                        }
                    />
                ))}
            </Layer>
        </Stage>
    </>)
}

export const DrawSignature = () => {
    const { setConfirmSignature } = useSignContext()
    const { t } = useTranslation("signNS");
    const refDiv = useRef<HTMLDivElement>(null)
    const [ready, setReady] = useState(false)
    const [save, setSave] = useState(false)
    const [clear, setClear] = useState(false)
    const [pencilType, setPencilType] = useState("pencil")

    useEffect(() => {
        if (refDiv.current) {
            setReady(true)
        }
    }, [refDiv])

    const onSaveData = (value: Blob) => {
        console.log(value) 
        setSave(false)
        setConfirmSignature(value)
    }

    const onClickClear = () => {
        setClear(true)
    }

    const onClickSave = () => {
        setSave(true)
    }

    const onClearLines = () => {
        setClear(false)
    }

    const handlePencil = (
        event: React.MouseEvent<HTMLElement>,
        newValue: string | null
    ) => {
        if (newValue !== null) {
            setPencilType(newValue)
        }
    }
    return (<>
        <Typography sx={{ marginTop: "10px" }} variant="h6" gutterBottom>
            {t("drawSignatureTxt")}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
            {t("drawSignatureDescTxt")}
        </Typography>
        <Grid container>
            <Grid item xs={12} sm={12} md={2} lg={3} xl={4}></Grid>
            <Grid item xs={12} sm={12} md={8} lg={6} xl={4}>
                <ToggleButtonGroup size="small" onChange={handlePencil} value={pencilType} exclusive>
                    <ToggleButton value="eraser">
                        <DeleteOutlineIcon fontSize="small"/>
                    </ToggleButton>
                    <ToggleButton value="pencil">
                        <CreateIcon fontSize="small"/>
                    </ToggleButton>
                </ToggleButtonGroup>
                <Button onClick={onClickClear} variant="text">
                    {t("clearTxt")}
                </Button>
                <Box ref={refDiv} sx={{
                    height: "300px",
                    bgcolor: "#fff",
                    border: "2px solid aqua",
                    cursor: "crosshair"
                }}>
                    <If condition={refDiv.current !== null && ready}>
                        <DrawArea
                            clearLines={clear}
                            onClearLines={onClearLines}
                            onSave={onSaveData}
                            save={save}
                            pencilType={pencilType}
                            parent={refDiv.current!!}/>
                    </If>
                </Box>
                <Button onClick={onClickSave} sx={{ marginTop: "10px" }} fullWidth variant="contained">
                    {t("acceptTxt")}
                </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={3} xl={4}></Grid>
        </Grid>
    </>)
}