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
    extraParams?: Options,
    onPageClick?: () => void,
    showAllPages?: boolean
}
export const PDFViewer = ({
                              file,
                              onLoadSuccess,
                              page = 1,
                              children,
                              onFieldsLayerReady,
                              extraParams,
                              onPageClick,
                              showAllPages = false
                          }: PDFViewerProps) => {
    const [pageSize, setPageSize] = useState<PageSize | null>(null)
    const [pdfProxy, setPdfProxy] = useState<PDFDocumentProxy | null>(null)
    const { t } = useTranslation("pdfViewerNS");
    const onDocumentLoadSuccess = (proxy: PDFDocumentProxy) => {
        setPdfProxy(proxy)
        if (onLoadSuccess) {
            onLoadSuccess(proxy)
        }
    }

    const onDocumentError = (_e: Error) => {
        setPdfProxy(null)
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

    const onPageClickEvent = () => {
        if (onPageClick) {
            onPageClick()
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
            <If condition={showAllPages && pdfProxy !== null}>
                {Array(pdfProxy?.numPages).fill({ }).map((e, i) =>  (
                    <Page
                        key={i}
                        className="page-viewer"
                        error={<>
                            <Alert severity="error">{ t("pdfPageError") }</Alert>
                        </>}
                        loading={<>
                            <LinearProgress />
                            <Alert severity="info">{ t("pdfPageLoading") }</Alert>
                        </>}
                        noData={<>
                            <Alert severity="info">{ t("pdfPageNoData")}</Alert>
                        </>}
                        pageNumber={i + 1} />
                ))}
                { children }
            </If>
            <If condition={!showAllPages}>
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
                        onClick={onPageClickEvent}
                        pageSize={pageSize!!}>
                        { children }
                    </FieldsLayer>
                </If>
            </If>
        </Document>
    </div>)
}