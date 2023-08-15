import {PDFViewer} from "../../components/pdf-viewer";
import {useEditorContext} from "./EditorContext";
import {PDFDocumentProxy} from "pdfjs-dist";

const url = "http://localhost:3000/assets/example-file.pdf"

export const Editor = () => {
    const { setPages, page } = useEditorContext()

    const onLoadSuccess = (page: PDFDocumentProxy) => {
        setPages(page.numPages)
    }

    return (<>
        <PDFViewer page={page} file={url} onLoadSuccess={onLoadSuccess}/>
    </>)
}