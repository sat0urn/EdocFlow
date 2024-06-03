package org.talos.server.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "inbox")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Inbox {
    @Id
    private String id;
    private User sender;
    private List<InboxReceivers> receivers;
    private PDFDocument pdfDocument;
    private String rejectReason;
}
