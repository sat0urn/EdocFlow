package org.talos.server.dto;

import lombok.AllArgsConstructor;
import org.talos.server.entity.DocumentStatus;
import org.talos.server.entity.PDFDocument;
import org.talos.server.entity.User;

import java.util.List;

@AllArgsConstructor
public class DocumentSigningProcessDto {
    private PDFDocument pdfDocument;
    private List<User> usersToSign;
    private DocumentStatus documentStatus;
}
