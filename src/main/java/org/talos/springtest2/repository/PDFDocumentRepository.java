package org.talos.springtest2.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.talos.springtest2.entity.PDFDocument;

public interface PDFDocumentRepository extends MongoRepository<PDFDocument, String> {
}
