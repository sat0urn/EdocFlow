package org.talos.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.talos.server.entity.PDFDocument;
import org.talos.server.service.PdfDocumentService;

import java.util.List;

@CrossOrigin("*")
@RestController
public class FileUploadController {

    @Autowired
    private PdfDocumentService pdfDocumentService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam("name") String name,
            @RequestParam("file") MultipartFile file) {
        try {
            byte[] content = file.getBytes();
            PDFDocument pdfDocument = pdfDocumentService.savePdf(name, content);
            return ResponseEntity.ok("File uploaded successfully: " + pdfDocument.getId());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Could not upload the file: " + e.getMessage());
        }
    }

    @GetMapping("/documents")
    public ResponseEntity<List<PDFDocument>> getAllDocuments() {
        List<PDFDocument> documents = pdfDocumentService.getAllPdfDocuments();
        return ResponseEntity.ok(documents);
    }

}
