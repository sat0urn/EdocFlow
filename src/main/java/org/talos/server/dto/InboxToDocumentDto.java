package org.talos.server.dto;

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
