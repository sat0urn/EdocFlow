package org.talos.server.controller;

import io.jsonwebtoken.Claims;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.talos.server.config.JwtService;
import org.talos.server.dto.*;

import org.talos.server.entity.Inbox;
import org.talos.server.entity.User;
import org.talos.server.exception.DataNotFoundException;
import org.talos.server.service.InboxService;
import org.talos.server.service.PdfDocumentService;
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

    private final PdfDocumentService pdfDocumentService;
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
    @GetMapping("/get/{id}")
    public InboxDto getInboxById(@RequestHeader("Authorization") String authHeader,
                                 @PathVariable("id")String inboxId){
        String receiverEmail = jwtService.extractClaim(authHeader.substring(7), Claims::getSubject);

        return inboxService.getInboxByIdAndUserEmail(inboxId,receiverEmail);
    }

    //here Aslan should provide signed document into inboxDto
    @PostMapping("/sign")
    public ResponseEntity<?> acceptInbox(@RequestBody InboxToDocumentDto inboxToDocumentDto)
    {
        Inbox inbox = inboxService.signInbox(inboxToDocumentDto.getInboxId());


        String documentId = pdfDocumentService.savePdfDocument(inbox,inboxToDocumentDto.getFileData());


        userService.saveUsersPdf(documentId,inbox.getSender().getId());
        userService.saveUsersPdf(documentId,inbox.getReceiver().getId());
        return ResponseEntity.ok("document signed successfully");
    }
    @PostMapping("/reject")
    public ResponseEntity<?> rejectDocument(@RequestBody InboxRejectDto rejectDocumentDto)
    {
        inboxService.rejectDocument(rejectDocumentDto);
        return ResponseEntity.ok("document rejected successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteInbox(@PathVariable("id")String id)
    {
        inboxService.deleteInboxById(id);
        return ResponseEntity.ok("inbox deleted successfully");
    }
}
