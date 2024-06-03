package org.talos.server.dto.document_dto;

import lombok.*;
import org.talos.server.entity.DocumentStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class PDFDocumentDto {
    private String name;
    private byte[] fileData;
    private String createdTime;
    private DocumentStatus status;
}
