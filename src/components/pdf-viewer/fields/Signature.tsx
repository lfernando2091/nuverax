import {Text as KonvaText, Rect, Group} from 'react-konva';
import {useRef, useState} from "react";
import Konva from "konva";
import { Field } from '../../../pages/models/FieldModel';

export type SignatureProps = {
    data: Field
    onUpdate: (value: Field) => void
}

export const Signature = ({
                              data,
                              onUpdate
                          }: SignatureProps) => {
    const [isDragging, setIsDragging] = useState(false)
    const rectRef = useRef<Konva.Rect>(null)

    return (<>
        <Group
            x={data.position.x}
            y={data.position.y}
            draggable
            width={data.size.width}
            height={data.size.height}
            onDragStart={() => {
                setIsDragging(true)
            }}
            onDragEnd={(e) => {
                setIsDragging(false)
                onUpdate({
                    ...data,
                    position: {
                        x: e.target.x(),
                        y: e.target.y(),
                    }
                })
            }}
            onMouseEnter={e => {
                const stage = e.target.getStage()
                if (stage) {
                    // style stage container:
                    const container = stage.container()
                    container.style.cursor = "move"
                }
            }}
            onMouseLeave={e => {
                const stage = e.target.getStage()
                if (stage) {
                    const container = stage.container()
                    container.style.cursor = "default"
                }
            }}
        >
            <Rect
                ref={rectRef}
                fill={isDragging ? '#013338b3' : '#02505A'}
                stroke={isDragging ? '#F7AC34B3' : '#013338'}
                strokeWidth={3}
                width={data.size.width}
                height={data.size.height}/>
            <KonvaText
                width={data.size.width}
                text="(FIRMA)"
                align="center"
                padding={5}
                fill={isDragging ? '#f7ac34' : '#fff'}
            />
        </Group>
    </>)
}