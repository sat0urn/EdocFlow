import {Document, Page, pdfjs} from 'react-pdf'
import {useState, useEffect} from 'react'
import {allDocFormData} from "../../../data/docFormData.js";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();

const PDFViewer = ({pdfTitle, pdfFile, handleSelectChange, pdfBytes}) => {
    const [numPages, setNumPages] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');

    const onDocumentLoadSuccess = ({numPages}) => {
        setNumPages(numPages);
    }

    useEffect(() => {
        if (pdfBytes) {
            // Create a blob URL for the pdfBytes
            const blob = new Blob([pdfBytes], {type: 'application/pdf'});
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);

            // Clean up the blob URL after it's been used
            return () => URL.revokeObjectURL(url);
        }
    }, [pdfBytes]);

    return (
        <div className={"card border-0 rounded-4 shadow-sm p-5"}>
            <h3 className={"text-primary"}>
                Document: {pdfTitle}
            </h3>

            <select
                className={"form-select my-4"}
                value={pdfFile}
                onChange={handleSelectChange}
            >
                {allDocFormData.map(({id, pdf, title}) =>
                    (
                        <option key={id} value={pdf}>
                            {title}
                        </option>
                    )
                )}
            </select>

            <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                className='card rounded-5 border-black'
            >
                {Array.from(
                    new Array(numPages),
                    (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            className="my-5 rounded-5"
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    )
                )}
            </Document>
        </div>
    )
}

export default PDFViewer