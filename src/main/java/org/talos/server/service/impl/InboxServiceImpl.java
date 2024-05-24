package org.talos.server.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.talos.server.dto.AllInboxesDto;
import org.talos.server.dto.InboxCreateDto;
import org.talos.server.entity.DocumentStatus;
import org.talos.server.entity.Inbox;
import org.talos.server.entity.PDFDocument;
import org.talos.server.entity.User;
import org.talos.server.exception.DataNotFoundException;
import org.talos.server.repository.InboxRepository;
import org.talos.server.service.InboxService;
import org.talos.server.service.UserService;

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
        var pdfDocument = PDFDocument.builder()
                .name(inboxCreateDto.getName())
                .fileData(inboxCreateDto.getFileData())
                .createdTime(inboxCreateDto.getCreatedTime())
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
}
