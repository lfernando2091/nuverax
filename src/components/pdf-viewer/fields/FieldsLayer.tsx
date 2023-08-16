import {Stage, Layer} from "react-konva";
import {PageSize} from "../models/PDFViewerModel";
import {ReactNode} from "react";

export type FieldsLayerProps = {
    pageSize: PageSize
    children: ReactNode
}

export const FieldsLayer = ({
                                pageSize,
                                children
                            }: FieldsLayerProps) => {
    return (<>
        <Stage className="stage-fields-layer" style={{
            zIndex: 10,
            position: "absolute"
        }} width={pageSize.current.w}
               height={pageSize.current.h}>
            <Layer>
                { children }
            </Layer>
        </Stage>
    </>)
}