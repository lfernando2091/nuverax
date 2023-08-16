import {Stage, Layer} from "react-konva";
import {PageSize} from "../models/PDFViewerModel";
import {ReactNode, useEffect} from "react";

export type FieldsLayerProps = {
    pageSize: PageSize
    children: ReactNode,
    onReady?: () => void
}

export const FieldsLayer = ({
                                pageSize,
                                children,
                                onReady
                            }: FieldsLayerProps) => {
    useEffect(() => {
        if (onReady) {
            onReady()
        }
    }, []);

    return (<>
        <Stage className="stage-fields-layer" style={{
            zIndex: 10,
            position: "absolute"
        }} width={pageSize.current.w}
               on
               height={pageSize.current.h}>
            <Layer className="filed-layer">
                { children }
            </Layer>
        </Stage>
    </>)
}