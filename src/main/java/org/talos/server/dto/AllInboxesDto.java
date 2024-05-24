package org.talos.server.dto;

import lombok.*;
import org.springframework.stereotype.Service;
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
