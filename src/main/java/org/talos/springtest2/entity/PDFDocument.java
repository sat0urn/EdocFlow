package org.talos.springtest2.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "documents")
@Data
public class PDFDocument {
    @Id
    private String id;
    private String name;
    private byte[] fileData;

    public PDFDocument() {}

    public PDFDocument(String name, byte[] fileData) {
        this.name = name;
        this.fileData = fileData;
    }
}
