package org.talos.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PDFDocumentDto {
    private String name;
    private byte[] fileData;
    private String createdTime;
    private String status;
}
