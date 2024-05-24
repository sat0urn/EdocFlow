package org.talos.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;
import org.talos.server.entity.PDFDocument;

import java.util.List;

@Repository
public interface PdfDocumentRepository extends MongoRepository<PDFDocument,String> {
    List<PDFDocument> findAllByIdIn(List<String> id);
}
