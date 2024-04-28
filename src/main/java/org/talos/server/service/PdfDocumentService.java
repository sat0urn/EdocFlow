package org.talos.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.talos.server.entity.PDFDocument;
import org.talos.server.repository.PDFDocumentRepository;

import java.util.List;

@Service
public class PdfDocumentService {
    @Autowired
    private PDFDocumentRepository pdfDocumentRepository;

    public PDFDocument savePdf(String name, byte[] content) {
        PDFDocument pdfDocument = new PDFDocument();
        pdfDocument.setName(name);
        pdfDocument.setFileData(content);
        return pdfDocumentRepository.save(pdfDocument);
    }

    public List<PDFDocument> getAllPdfDocuments() {
        return pdfDocumentRepository.findAll();
    }
}
