package org.talos.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.talos.server.entity.DocumentPDF;

import java.util.List;

@Repository
public interface DocumentRepository extends MongoRepository<DocumentPDF,String> {
    List<DocumentPDF> findAllByIdIn(List<String> id);
}
