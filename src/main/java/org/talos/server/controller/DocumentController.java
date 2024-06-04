package org.talos.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.talos.server.entity.DocumentPDF;
import org.talos.server.service.DocumentService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/document")
public class DocumentController {

  private final DocumentService documentService;

  @GetMapping("/getAll")
  public ResponseEntity<List<DocumentPDF>> getAllDocuments(
          @RequestHeader("Authorization") String authHeader
  ) {
    List<DocumentPDF> documentPDFS = documentService.listUserDocuments(authHeader);
    return ResponseEntity.ok(documentPDFS);
  }
}
