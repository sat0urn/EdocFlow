package org.talos.server.dto.inboxes_dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.talos.server.entity.DocumentStatus;
import org.talos.server.entity.InboxReceivers;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class AllSendInboxesDto {
    private String inboxId;
    private List<InboxReceivers> receivers;
    private String documentTitle;
    private String createdDate;
    private DocumentStatus documentStatus;
}
