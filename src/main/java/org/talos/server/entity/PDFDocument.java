package org.talos.server.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "documents")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PDFDocument {
    @Id
    private String id;
    private String name;
    private byte[] fileData;
    private String createdTime;
    private DocumentStatus status;
}
