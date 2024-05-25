package org.talos.server.dto;

import lombok.*;
import org.talos.server.entity.PDFDocument;
import org.talos.server.entity.User;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class InboxDto {
    private PDFDocumentDto pdfDocumentDto;
    private User sender;
}
