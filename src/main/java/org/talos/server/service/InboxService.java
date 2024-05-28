package org.talos.server.service;

import org.talos.server.dto.AllInboxesDto;
import org.talos.server.dto.InboxCreateDto;
import org.talos.server.dto.InboxDto;
import org.talos.server.dto.InboxRejectDto;
import org.talos.server.entity.Inbox;
import org.talos.server.entity.User;

import java.util.List;
import java.util.Optional;

public interface InboxService {
    void createInbox(InboxCreateDto inboxCreateDto, String senderEmail);

    List<AllInboxesDto> getInboxesByReceiver(User userReceiver);

    InboxDto getInboxByIdAndUserEmail(String inboxId, String receiverEmail);

    Optional<Inbox> getInboxById(String inboxId);

    void rejectDocument(InboxRejectDto rejectDocumentDto);

    Inbox signInbox(String inboxId);

    void deleteInboxById(String id);
}
