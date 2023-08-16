import {Stage, Layer} from "react-konva";
import {PageSize} from "../models/PDFViewerModel";

export type FieldsLayerProps = {
    pageNumber: number
    // parent?: HTMLDivElement
    pageSize: PageSize
    onUpdate: () => void
}

export const FieldsLayer = ({
                                pageSize,
                                pageNumber,
                                onUpdate
                            }: FieldsLayerProps) => {
    return (<>
        <Stage className="stage-fields-layer" style={{
            zIndex: 10,
            position: "absolute"
        }} width={pageSize.current.w}
               height={pageSize.current.h}>
            <Layer>

            </Layer>
        </Stage>
    </>)
}