package org.talos.server.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "documents")
@Data
@NoArgsConstructor
public class PDFDocument {
    @Id
    private String id;
    private String name;
    private byte[] fileData;
}
