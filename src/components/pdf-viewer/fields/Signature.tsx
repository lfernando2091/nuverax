import {Text as KonvaText, Rect, Group, Transformer} from 'react-konva';
import {useEffect, useRef, useState} from "react";
import Konva from "konva";
import { Field } from '../../../pages/models/FieldModel';
import { If } from '../../common/IfStatement';

export type SignatureProps = {
    text?: string
    selected?: boolean
    data: Field
    onUpdate: (value: Field) => void
    onClick?: (value: Field) => void
}

export const Signature = ({
                              text = "(FIRMA)",
                              selected = false,
                              data,
                              onUpdate,
                              onClick
                          }: SignatureProps) => {
    const shapeRef = useRef<Konva.Group>(null)
    const transformRef = useRef<Konva.Transformer>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [isTransform, setIsTransform] = useState(false)
    const rectRef = useRef<Konva.Rect>(null)

    const onClickEvent = (_ev: Konva.KonvaEventObject<MouseEvent | Event>) => {
        if (onClick) {
            onClick(data)
        }
        _ev.cancelBubble = true
    }

    const onDoubleClickEvent = (_ev: Konva.KonvaEventObject<MouseEvent | Event>) => {
        setIsTransform(true)
    }

    const onTransformShape = () => {
        // we need to attach transformer manually
        if (transformRef.current !== null && shapeRef.current !== null) {
            transformRef.current.nodes([shapeRef.current]);
            transformRef.current.getLayer()?.batchDraw();
        }
    }

    useEffect(() => {
        if (!selected) {
            setIsTransform(false)
        }
    }, [selected]);

    useEffect(() => {
        if (isTransform && selected) {
            onTransformShape()
        }
    }, [isTransform, selected]);

    return (<>
        <Group
            ref={shapeRef}
            id={data.uuId}
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
            onTransformEnd={(e) => {
                // transformer is changing scale of the node
                // and NOT its width or height
                // but in the store we have only width and height
                // to match the data better we will reset scale on transform end
                const node = shapeRef.current;
                if (node !== null) {
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    onUpdate({
                        ...data,
                        position: {
                            x: node.x(),
                            y: node.y(),
                        },
                        size: {
                            // set minimal value
                            width: Math.max(5, node.width() * scaleX),
                            height: Math.max(node.height() * scaleY),
                        }
                    });
                }
            }}
            onClick={onClickEvent}
            onTap={onClickEvent}
            onDblClick={onDoubleClickEvent}
            onDblTap={onDoubleClickEvent}
        >
            <Rect
                ref={rectRef}
                fill={isDragging ? '#013338b3' : '#02505A'}
                stroke={isDragging ? '#F7AC34B3' : '#013338'}
                strokeWidth={selected ? 4: 0}
                dash={[5, 5]}
                dashEnabled={selected}
                width={data.size.width}
                height={data.size.height}/>
            <KonvaText
                width={data.size.width}
                height={data.size.height}
                text={text}
                align="center"
                padding={5}
                fill={isDragging ? '#f7ac34' : '#fff'}
            />
        </Group>
        <If condition={isTransform}>
            <Transformer
                ref={transformRef}
                keepRatio={true}
                anchorSize={7}
                rotationSnaps={[0, 90, 180, 270]}
                boundBoxFunc={(oldBox, newBox) => {
                    // limit resize
                    if (Math.abs(newBox.width) < 10 || Math.abs(newBox.height) < 10) {
                        return oldBox;
                    } else if (Math.abs(newBox.width) > 300 || Math.abs(newBox.height) > 200) {
                        return oldBox;
                    }
                    return newBox;
                }}>

            </Transformer>
        </If>
    </>)
}