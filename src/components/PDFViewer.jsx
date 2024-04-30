import {Document, Page, pdfjs} from 'react-pdf'
import {useState, useEffect} from 'react'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();

function PDFViewer({pdfBytes}) {
    const [numPages, setNumPages] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');

    function onDocumentLoadSuccess({numPages}) {
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
        <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            className='rounded-5 my-5'
        >
            {Array.from(
                new Array(numPages),
                (el, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                    />
                )
            )}
        </Document>
    )
}

export default PDFViewer