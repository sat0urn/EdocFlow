package org.talos.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.talos.server.entity.PDFDocument;
import org.talos.server.service.PDFDocumentService;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class FileUploadController {

    private final PDFDocumentService pdfDocumentService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam("name") String name,
            @RequestParam("file") MultipartFile file,
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            byte[] content = file.getBytes();
            pdfDocumentService.saveUserPdf(name, content, authHeader);
            return ResponseEntity.ok("File uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Could not upload the file: " + e.getMessage());
        }
    }

    @GetMapping("/documents")
    public ResponseEntity<List<PDFDocument>> getAllDocuments(
            @RequestHeader("Authorization") String authHeader
    ) {
        List<PDFDocument> PDFDocuments = pdfDocumentService.listUserDocuments(authHeader);
        return ResponseEntity.ok(PDFDocuments);
    }

}
