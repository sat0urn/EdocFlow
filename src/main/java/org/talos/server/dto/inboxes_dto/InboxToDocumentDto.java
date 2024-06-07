package org.talos.server.dto.inboxes_dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class InboxToDocumentDto {
    private List<String> employeesEmail;
    private byte[] fileData;
    private String inboxId;
}
