import { Document, Page } from 'react-pdf'
import { useState, useEffect } from 'react'

function PDFViewer({ pdfBytes }) {
  const [numPages, setNumPages] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    if (pdfBytes) {
      // Create a blob URL for the pdfBytes
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
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
      className='overflow-y-auto rounded-5 me-2 my-3'
    >
      {Array.from(
        new Array(numPages),
        (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={480}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        )
      )}
    </Document>
  )
}

export default PDFViewer