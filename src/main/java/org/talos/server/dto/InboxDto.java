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
    private String inboxId;
    private PDFDocumentDto pdfDocumentDto;
    private User sender;
    private String remark;
}
