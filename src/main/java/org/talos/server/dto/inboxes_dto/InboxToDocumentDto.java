package org.talos.server.dto.inboxes_dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class InboxToDocumentDto {
    private byte[] fileData;
    String inboxId;
}
