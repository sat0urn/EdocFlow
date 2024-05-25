package org.talos.server.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class RejectDocumentDto {
    private String inboxId;
    private String reasonToReject;
}
