package org.talos.server.controller;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.talos.server.config.JwtService;
import org.talos.server.dto.inboxes_dto.AllSendInboxesDto;
import org.talos.server.entity.User;
import org.talos.server.exception.DataNotFoundException;
import org.talos.server.service.DocumentService;
import org.talos.server.service.InboxService;
import org.talos.server.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/outbox")
public class OutboxController {

  private final JwtService jwtService;
  private final UserService userService;
  private final InboxService inboxService;

  @GetMapping("/getAll")
  public List<AllSendInboxesDto> getAllSend(
          @RequestHeader("Authorization") String authHeader
  ) {
    String senderEmail = jwtService.extractUsername(authHeader.substring(7));
    Optional<User> userSender = userService.getUserByEmail(senderEmail);
    if (userSender.isEmpty())
      throw new DataNotFoundException("User receiver by email" + senderEmail + ", does not exist");
    return inboxService.getAllSendInboxes(userSender.get());
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<?> deleteOutboxById(@PathVariable("id")String id,
                                            @RequestHeader("Authorization") String authHeader)
          throws IllegalAccessException {
    String senderEmail = jwtService.extractUsername(authHeader.substring(7));
    String inboxId = inboxService.deleteOutboxById(id,senderEmail);
    return ResponseEntity.ok("Inbox by id " + inboxId + ", deleted successfully");

  }
}
