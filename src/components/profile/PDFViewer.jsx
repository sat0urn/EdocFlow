import {Document, Page, pdfjs} from 'react-pdf'
import {useState, useEffect} from 'react'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();

const PDFViewer = ({pdfBytes}) => {
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
    )
}

export default PDFViewer