package org.talos.server.controller;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.talos.server.config.JwtService;
import org.talos.server.dto.inboxes_dto.*;
import org.talos.server.entity.DocumentStatus;
import org.talos.server.entity.Inbox;
import org.talos.server.entity.InboxReceivers;
import org.talos.server.entity.User;
import org.talos.server.exception.DataNotFoundException;
import org.talos.server.service.DocumentService;
import org.talos.server.service.InboxService;
import org.talos.server.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inbox")
@RequiredArgsConstructor
public class InboxController {

  private final JwtService jwtService;
  private final InboxService inboxService;
  private final UserService userService;
  private final DocumentService documentService;

  @PostMapping("/create")
  public ResponseEntity<?> createInbox(
          @RequestBody InboxCreateDto inboxCreateDto,
          @RequestHeader("Authorization") String authHeader
  ) {
    String senderEmail = jwtService.extractClaim(authHeader.substring(7), Claims::getSubject);
    inboxService.createInbox(inboxCreateDto, senderEmail);
    return ResponseEntity.ok("Inbox created successfully");
  }

  @GetMapping("/getAll")
  public List<AllInboxesDto> getAllInboxes(
          @RequestHeader("Authorization") String authHeader
  ) {
    String receiverEmail = jwtService.extractClaim(authHeader.substring(7), Claims::getSubject);
    Optional<User> userReceiver = userService.getUserByEmail(receiverEmail);
    if (userReceiver.isEmpty())
      throw new DataNotFoundException("User receiver by email" + receiverEmail + ", does not exist");

    return inboxService.getInboxesByReceiver(receiverEmail);
  }

  @GetMapping("/get/{id}")
  public InboxDto getInboxById(
          @RequestHeader("Authorization") String authHeader,
          @PathVariable("id") String inboxId
  ) throws IllegalAccessException {
    String receiverEmail = jwtService.extractClaim(authHeader.substring(7), Claims::getSubject);
    return inboxService.getInboxByIdAndUserEmail(inboxId, receiverEmail);
  }


  //here Aslan should provide signed document into inboxDto
  @PostMapping("/sign")
  public ResponseEntity<?> acceptInbox(
          @RequestBody InboxToDocumentDto inboxToDocumentDto,
          @RequestHeader("Authorization") String authHeader
  ) throws IllegalAccessException {
    String receiverEmail = jwtService.extractClaim(authHeader.substring(7), Claims::getSubject);
    Inbox inbox = inboxService.signInbox(inboxToDocumentDto.getInboxId(),
            inboxToDocumentDto.getFileData(), receiverEmail);

    if (inbox.getDocumentPDF().getStatus().equals(DocumentStatus.COMPLETED)) {
      String documentId = documentService.saveDocument(inbox, inboxToDocumentDto.getFileData());
      userService.saveUsersPdf(documentId, inbox.getSender().getEmail());
      for (InboxReceivers inboxReceiver : inbox.getReceivers()) {
        userService.saveUsersPdf(documentId, inboxReceiver.getUserEmail());
      }
    }

    return ResponseEntity.ok("document signed successfully");
  }

  @PostMapping("/reject")
  public ResponseEntity<?> rejectDocument(
          @RequestBody InboxRejectDto rejectDocumentDto,
          @RequestHeader("Authorization") String authHeader
  ) throws IllegalAccessException {
    String receiverEmail = jwtService.extractClaim(authHeader.substring(7), Claims::getSubject);
    inboxService.rejectDocument(rejectDocumentDto, receiverEmail);
    return ResponseEntity.ok("document rejected successfully");
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<?> deleteInbox(
          @PathVariable("id") String id,
          @RequestHeader("Authorization") String authHeader
  ) throws IllegalAccessException {
    String receiverEmail = jwtService.extractClaim(authHeader.substring(7), Claims::getSubject);
    inboxService.deleteInboxById(id, receiverEmail);
    return ResponseEntity.ok("inbox deleted successfully");
  }
}
