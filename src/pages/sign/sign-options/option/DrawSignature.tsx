import {Box} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {Layer, Stage, Line } from "react-konva";
import Konva from "konva"
import { If } from "../../../../components/common/IfStatement";

type LineDef = {
    points: number[]
    tool?: string
}

export const DrawSignature = () => {
    const refDiv = useRef<HTMLDivElement>(null)
    const [lines, setLines] = useState<LineDef[]>([])
    const isDrawing = useRef(false)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if (refDiv.current) {
            setReady(true)
        }
    }, [refDiv])

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
        <Box ref={refDiv} sx={{
            height: "300px",
            bgcolor: "#fff",
            border: "2px solid aqua"
        }}>
            <If condition={refDiv.current !== null && ready}>
                <Stage width={refDiv.current?.clientWidth}
                       height={refDiv.current?.clientHeight}
                       onMouseDown={handleMouseDown}
                       onMousemove={handleMouseMove}
                       onMouseup={handleMouseUp}
                       onTouchStart={handleMouseDown}
                       onTouchMove={handleMouseMove}
                       onTouchEnd={handleMouseUp}
                       className="canvas-draw-stage">
                    <Layer className="canvas-draw-layer">
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
            </If>
        </Box>
    </>)
}