package org.talos.server.service;

import org.talos.server.dto.inboxes_dto.*;
import org.talos.server.entity.Inbox;
import org.talos.server.entity.User;

import java.util.List;
import java.util.Optional;

public interface InboxService {
  void createInbox(InboxCreateDto inboxCreateDto, String senderEmail);

  List<AllInboxesDto> getInboxesByReceiver(String receiverEmail);

  InboxDto getInboxByIdAndUserEmail(String inboxId, String receiverEmail) throws IllegalAccessException;

  Optional<Inbox> getInboxById(String inboxId);

  void rejectDocument(InboxRejectDto rejectDocumentDto, String email) throws IllegalAccessException;

  void deleteInboxById(String id, String userEmail);

  List<AllSendInboxesDto> getAllSendInboxes(User user);

  Inbox signInbox(String inboxId, byte[] fileData, String signerEmail) throws IllegalAccessException;

  void setNewReceiversToInbox(String inboxId, ReceiversAddInboxDto receiversAddInboxDto);

  String deleteOutboxById(String id, String senderEmail) throws IllegalAccessException;
}
