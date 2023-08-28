import "./PDFViewer.css"
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {Options, PageCallback} from "react-pdf/src/shared/types";
import {PDFDocumentProxy} from "pdfjs-dist";
import {Alert, LinearProgress} from "@mui/material";
import {Document, Page} from "react-pdf";
import {useTranslation} from "react-i18next";
import {ReactNode, useEffect, useState} from "react";
import {FieldsLayer} from "./fields/FieldsLayer";
import {PageSize} from "./models/PDFViewerModel";
import {If} from "../common/IfStatement";

const options: Options = {
    cMapUrl: 'cmaps/',
    standardFontDataUrl: 'standard_fonts/',
    httpHeaders: {
        "Authorization": "Basic ABC"
    }
}
type PDFFile = string | File | null;

export type PDFViewerProps = {
    file: PDFFile,
    onLoadSuccess?: (page: PDFDocumentProxy) => void
    page?: number
    children: ReactNode
    onFieldsLayerReady?: () => void,
    extraParams?: Options
}
export const PDFViewer = ({
                              file,
                              onLoadSuccess,
                              page = 1,
                              children,
                              onFieldsLayerReady,
                              extraParams
                          }: PDFViewerProps) => {
    const [pageSize, setPageSize] = useState<PageSize | null>(null)
    const { t } = useTranslation("pdfViewerNS");
    const onDocumentLoadSuccess = (proxy: PDFDocumentProxy) => {
        if (onLoadSuccess) {
            onLoadSuccess(proxy)
        }
    }

    const onDocumentError = (_e: Error) => {

    }

    const onPageError = (_error: Error) => {
        setPageSize(null)
    }

    const onPageReady = (page: PageCallback) => {
        setPageSize({
            current: {
                h: page.height,
                w: page.width
            },
            original: {
                h: page.originalHeight,
                w: page.originalWidth
            }
        })
        if (onFieldsLayerReady) {
            onFieldsLayerReady()
        }
    }

    useEffect(() => {
        setPageSize(null)
    }, [page, file]);

    return (<div className="pdf-viewer-container">
        <Document className="document-viewer" file={file}
                  noData={<>
                      <Alert severity="info">{ t("pdfNoData")}</Alert>
                  </>}
                  error={<>
                      <Alert severity="error">{ t("pdfError") }</Alert>
                  </>}
                  loading={<>
                      <LinearProgress />
                      <Alert severity="info">{ t("pdfLoading") }</Alert>
                  </>}
                  onLoadError={onDocumentError}
                  onLoadSuccess={onDocumentLoadSuccess}
                  options={extraParams}>
            <Page
                className="page-viewer"
                error={<>
                    <Alert severity="error">{ t("pdfPageError") }</Alert>
                </>}
                loading={<>
                    <LinearProgress />
                    <Alert severity="info">{ t("pdfPageLoading") }</Alert>
                </>}
                onLoadError={onPageError}
                onLoadSuccess={onPageReady}
                noData={<>
                    <Alert severity="info">{ t("pdfPageNoData")}</Alert>
                </>}
                pageNumber={page} />
            <If condition={pageSize !== null}>
                <FieldsLayer
                    pageSize={pageSize!!}>
                    { children }
                </FieldsLayer>
            </If>
        </Document>
    </div>)
}