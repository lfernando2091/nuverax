import {Stage, Layer} from "react-konva";
import {PageSize} from "../models/PDFViewerModel";
import {ReactNode} from "react";
import Konva from "konva";

export type FieldsLayerProps = {
    pageSize: PageSize
    children: ReactNode,
    onClick?: () => void
}

export const FieldsLayer = ({
                                pageSize,
                                children,
                                onClick
                            }: FieldsLayerProps) => {
    const onClickStage = (_ev: Konva.KonvaEventObject<MouseEvent>) => {
        if (onClick) {
            onClick()
        }
    }

    return (<>
        <Stage className="stage-fields-layer" style={{
            zIndex: 10,
            position: "absolute"
        }} width={pageSize.current.w}
               height={pageSize.current.h}
               onClick={onClickStage}>
            <Layer className="filed-layer">
                { children }
            </Layer>
        </Stage>
    </>)
}