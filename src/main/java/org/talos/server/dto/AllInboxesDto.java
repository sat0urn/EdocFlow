package org.talos.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.talos.server.entity.DocumentStatus;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class AllInboxesDto {
    private String inboxId;
    private String senderEmail;
    private String documentTitle;
    private DocumentStatus documentStatus;
}
