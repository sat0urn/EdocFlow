package org.talos.server.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.talos.server.dto.*;
import org.talos.server.entity.DocumentStatus;
import org.talos.server.entity.Inbox;
import org.talos.server.entity.PDFDocument;
import org.talos.server.entity.User;
import org.talos.server.exception.DataNotFoundException;
import org.talos.server.repository.InboxRepository;
import org.talos.server.service.InboxService;
import org.talos.server.service.UserService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class InboxServiceImpl implements InboxService {
    private final InboxRepository inboxRepository;
    private final UserService userService;
    @Override
    public void createInbox(InboxCreateDto inboxCreateDto, String senderEmail) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        var pdfDocument = PDFDocument.builder()
                .name(inboxCreateDto.getName())
                .fileData(inboxCreateDto.getFileData())
                .createdTime(String.valueOf(currentDateTime))
                .status(DocumentStatus.OnPROCESS)
                .build();
        String receiver = inboxCreateDto.getReceiverEmail();
        Optional<User> userSender = userService.getUserByEmail(senderEmail);
        if(userSender.isEmpty())
            throw new DataNotFoundException("User by email " + senderEmail + ", does not exist");

        Optional<User> userReceiver = userService.getUserByEmail(receiver);
        if(userReceiver.isEmpty())
            throw new DataNotFoundException("User by email " + receiver + ", does not exist");

        Inbox inbox = Inbox.builder().pdfDocument(pdfDocument)
                .receiver(userReceiver.get())
                .sender(userSender.get())
                .build();
        inboxRepository.save(inbox);
    }

    @Override
    public List<AllInboxesDto> getInboxesByReceiver(User userReceiver) {
        List<Inbox> inboxes = inboxRepository.findAllByReceiver(userReceiver);
        return inboxes.stream().map(inbox -> AllInboxesDto.builder()
                .inboxId(inbox.getId())
                .documentStatus(inbox.getPdfDocument().getStatus())
                .senderEmail(inbox.getSender().getEmail())
                .documentTitle(inbox.getPdfDocument().getName()).build())
                .collect(Collectors.toList());
    }

    @Override
    public InboxDto getInboxByIdAndUserEmail(String inboxId, String receiverEmail) {
        Optional<Inbox> inbox = inboxRepository.findById(inboxId);
        if(inbox.isEmpty())
            throw new DataNotFoundException("Inbox with id " + inboxId + " does not exist in the system ");
        if(inbox.get().getReceiver().getEmail().equals(receiverEmail))
        {
            return InboxDto.builder()
                    .inboxId(inboxId)
                    .pdfDocumentDto(PDFDocumentDto.builder()
                            .createdTime(inbox.get().getPdfDocument().getCreatedTime())
                            .fileData(inbox.get().getPdfDocument().getFileData())
                            .name(inbox.get().getPdfDocument().getName())
                            .status(inbox.get().getPdfDocument().getStatus()).build())
                    .sender(inbox.get().getSender())
                    .build();
        }
        return null;
    }

    @Override
    public Optional<Inbox> getInboxById(String inboxId) {
        return inboxRepository.findById(inboxId);
    }

    @Override
    public void rejectDocument(InboxRejectDto rejectDocumentDto) {
        Optional<Inbox> inbox = inboxRepository.findById(rejectDocumentDto.getInboxId());
        if(inbox.isEmpty())
            throw new DataNotFoundException("Inbox by id {}"+ rejectDocumentDto.getInboxId() + ", does not exist");

        inbox.get().setRejectReason(rejectDocumentDto.getReasonToReject());
        inbox.get().getPdfDocument().setStatus(DocumentStatus.REJECTED);
    }

    @Override
    public Inbox signInbox(String inboxId) {
        Optional<Inbox> inbox = inboxRepository.findById(inboxId);
        if(inbox.isEmpty())
            throw new DataNotFoundException("Inbox by id {}"+ inboxId+ ", does not exist");
        inbox.get().getPdfDocument().setStatus(DocumentStatus.ACCEPTED);
        inboxRepository.save(inbox.get());
        return inbox.get();
    }

    @Override
    public void deleteInboxById(String inboxId) {
        Optional<Inbox> inbox = inboxRepository.findById(inboxId);
        if(inbox.isEmpty())
            throw new DataNotFoundException("Inbox by id {}"+ inboxId+ ", does not exist");
        inboxRepository.delete(inbox.get());
    }
}
