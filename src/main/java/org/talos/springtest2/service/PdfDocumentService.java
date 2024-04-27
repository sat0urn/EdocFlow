package org.talos.springtest2.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.talos.springtest2.entity.PDFDocument;
import org.talos.springtest2.repository.PDFDocumentRepository;

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
