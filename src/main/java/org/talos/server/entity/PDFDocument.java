package org.talos.server.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

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
    private String status;
}
