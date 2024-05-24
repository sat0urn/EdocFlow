package org.talos.server.controller;

import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.talos.server.config.JwtService;
import org.talos.server.dto.AllInboxesDto;

import org.talos.server.dto.InboxCreateDto;
import org.talos.server.entity.User;
import org.talos.server.exception.DataNotFoundException;
import org.talos.server.service.InboxService;
import org.talos.server.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/inbox")
public class InboxController {
    private final JwtService jwtService;
    private final InboxService inboxService;
    private final UserService userService;
    @PostMapping("/create")
    public ResponseEntity<?> createInbox(@RequestBody InboxCreateDto inboxCreateDto,
                                         @RequestHeader("Authorization") String authHeader)

    {
        String senderEmail = jwtService.extractClaim(authHeader.substring(7), Claims::getSubject);
        inboxService.createInbox(inboxCreateDto,senderEmail);
        return ResponseEntity.ok("Inbox created successfully");

    }
    @GetMapping("/getAll")
    public List<AllInboxesDto> getAllInboxes(@RequestHeader("Authorization") String authHeader)
    {
        String receiverEmail = jwtService.extractClaim(authHeader.substring(7), Claims::getSubject);
        Optional<User> userReceiver = userService.getUserByEmail(receiverEmail);
        if(userReceiver.isEmpty())
            throw new DataNotFoundException("User receiver by email" + receiverEmail + ", does not exist");

        return inboxService.getInboxesByReceiver(userReceiver.get());

    }
}
