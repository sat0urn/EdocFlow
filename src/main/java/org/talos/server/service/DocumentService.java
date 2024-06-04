package org.talos.server.service;

import org.talos.server.dto.document_dto.DocumentDto;
import org.talos.server.entity.DocumentPDF;
import org.talos.server.entity.Inbox;

import java.util.List;

public interface DocumentService {
  void saveUserPdf(DocumentDto documentDto, String authHeader);

  List<DocumentPDF> listUserDocuments(String authHeader);

  String saveDocument(Inbox inbox, byte[] fileData);
}
