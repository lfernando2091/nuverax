import "./PDFViewer.css"
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {Options, PageCallback} from "react-pdf/src/shared/types";
import {PDFDocumentProxy} from "pdfjs-dist";
import {Alert, LinearProgress} from "@mui/material";
import {Document, Page} from "react-pdf";
import {useTranslation} from "react-i18next";
import {useEffect, useRef, useState} from "react";
import {FieldsLayer} from "./Fields/FieldsLayer";
import {PageSize} from "./models/PDFViewerModel";

const options: Options = {
    cMapUrl: 'cmaps/',
    standardFontDataUrl: 'standard_fonts/',
}
type PDFFile = string | File | null;

export type PDFViewerProps = {
    file: PDFFile,
    onLoadSuccess?: (page: PDFDocumentProxy) => void
    page?: number
}
export const PDFViewer = ({
                              file,
                              onLoadSuccess,
                              page = 1
                          }: PDFViewerProps) => {
    const refDiv = useRef<HTMLDivElement>(null)
    const [pageSize, setPageSize] = useState<PageSize | null>(null)
    const { t } = useTranslation("pdfViewerNS");
    const onDocumentLoadSuccess = (proxy: PDFDocumentProxy) => {
        if (onLoadSuccess) {
            onLoadSuccess(proxy)
        }
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
    }

    const onUpdate = () => {

    }

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
                  onLoadSuccess={onDocumentLoadSuccess}
                  options={options}>
            <Page
                className="page-viewer"
                error={<>
                    <Alert severity="error">{ t("pdfPageError") }</Alert>
                </>}
                loading={<>
                    <LinearProgress />
                    <Alert severity="info">{ t("pdfPageLoading") }</Alert>
                </>}
                onLoadSuccess={onPageReady}
                noData={<>
                    <Alert severity="info">{ t("pdfPageNoData")}</Alert>
                </>}
                pageNumber={page} />
            {pageSize !== null &&
                <>
                    <FieldsLayer
                        pageSize={pageSize}
                        pageNumber={page}
                        onUpdate={onUpdate}/>
                </>
            }
        </Document>
    </div>)
}