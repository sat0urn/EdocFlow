package org.talos.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.talos.server.dto.PDFDocumentDto;
import org.talos.server.entity.DocumentStatus;
import org.talos.server.entity.PDFDocument;
import org.talos.server.service.PdfDocumentService;
import org.talos.server.service.impl.PDFDocumentServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/documents")
@RequiredArgsConstructor
public class FileUploadController {

    private final PdfDocumentService pdfDocumentService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam("name") String name,
            @RequestParam("fileData") MultipartFile fileData,
            @RequestParam("createdTime") String createdTime,
            @RequestParam("status") String status,
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            pdfDocumentService.saveUserPdf(
                    new PDFDocumentDto(
                            name,
                            fileData.getBytes(),
                            createdTime,
                            DocumentStatus.ACCEPTED
                    ),
                    authHeader
            );
            return ResponseEntity.ok(" upFileloaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Could not upload the file: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<PDFDocument>> getAllDocuments(
            @RequestHeader("Authorization") String authHeader
    ) {
        List<PDFDocument> PDFDocuments = pdfDocumentService.listUserDocuments(authHeader);
        return ResponseEntity.ok(PDFDocuments);
    }
}
