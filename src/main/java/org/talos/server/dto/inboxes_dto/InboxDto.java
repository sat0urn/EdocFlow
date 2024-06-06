package org.talos.server.dto.inboxes_dto;

import lombok.*;
import org.talos.server.dto.document_dto.DocumentDto;
import org.talos.server.entity.InboxReceivers;
import org.talos.server.entity.User;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class InboxDto {
    private String inboxId;
    private DocumentDto documentDto;
    private InboxViewDto sender;
    private List<InboxReceivers> receivers;
    private String remark;
}
