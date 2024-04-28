package org.talos.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.talos.server.entity.PDFDocument;

public interface PDFDocumentRepository extends MongoRepository<PDFDocument, String> {
}
