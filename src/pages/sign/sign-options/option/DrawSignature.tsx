import {Box, Button, Typography} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {Layer, Stage, Line } from "react-konva";
import Konva from "konva"
import { If } from "../../../../components/common/IfStatement";

type LineDef = {
    points: number[]
    tool?: string
}

type DrawAreaProps = {
    parent: HTMLDivElement
    save: boolean
    onSave: (raw: Blob) => void
    onClearLines?: () => void
    clearLines?: boolean
}

const DrawArea = ({
                      parent,
                      save,
                      onSave,
                      clearLines,
                      onClearLines
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
                setLines([...lines, { points: [pos.x, pos.y] }]);
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
                        strokeWidth={5}
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
    const refDiv = useRef<HTMLDivElement>(null)
    const [ready, setReady] = useState(false)
    const [save, setSave] = useState(false)

    useEffect(() => {
        if (refDiv.current) {
            setReady(true)
        }
    }, [refDiv])

    const onSaveData = (value: Blob) => {

    }

    return (<>
        <Typography variant="h6" gutterBottom>
            h6. Heading
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
            subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            blanditiis tenetur
        </Typography>
        <Box ref={refDiv} sx={{
            height: "300px",
            bgcolor: "#fff",
            border: "2px solid aqua"
        }}>
            <If condition={refDiv.current !== null && ready}>
                <DrawArea onSave={onSaveData} save={save} parent={refDiv.current!!}/>
            </If>
        </Box>
        <Button variant="text">
            Borrar todo
        </Button>
        <Button variant="text">
            Guardar
        </Button>
    </>)
}