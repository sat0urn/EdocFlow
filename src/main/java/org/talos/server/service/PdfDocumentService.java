package org.talos.server.service;

import org.talos.server.dto.PDFDocumentDto;
import org.talos.server.entity.PDFDocument;

import java.util.List;

public interface PdfDocumentService {
    public void saveUserPdf(
            PDFDocumentDto pdfDocumentDto,
            String authHeader);
    public List<PDFDocument> listUserDocuments(String authHeader);
}
