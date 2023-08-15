import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {Options} from "react-pdf/src/shared/types";
import {PDFDocumentProxy} from "pdfjs-dist";
import {Alert, LinearProgress} from "@mui/material";
import {Document, Page} from "react-pdf";
import {useTranslation} from "react-i18next";

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
    const { t } = useTranslation("pdfViewerNS");
    const onDocumentLoadSuccess = (proxy: PDFDocumentProxy) => {
        if (onLoadSuccess) {
            onLoadSuccess(proxy)
        }
    }

    return (<>
        <Document file={file}
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
                pageNumber={page} />
        </Document>
    </>)
}