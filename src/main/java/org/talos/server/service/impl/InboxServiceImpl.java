package org.talos.server.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.talos.server.dto.document_dto.DocumentDto;
import org.talos.server.dto.inboxes_dto.*;
import org.talos.server.entity.*;
import org.talos.server.exception.DataNotFoundException;
import org.talos.server.repository.DepartmentRepository;
import org.talos.server.repository.InboxRepository;
import org.talos.server.repository.UserRepository;
import org.talos.server.service.InboxService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InboxServiceImpl implements InboxService {
  private final InboxRepository inboxRepository;
  private final UserRepository userRepository;
  private final DepartmentRepository departmentRepository;
  Logger logger = Logger.getLogger(InboxService.class.getName());
  LocalDateTime currentDateTime = LocalDateTime.now();

  @Override
  public void createInbox(InboxCreateDto inboxCreateDto, String senderEmail) {
    if (senderEmail == null || senderEmail.isEmpty()) {
      throw new IllegalArgumentException("Sender email cannot be null or empty");
    }

    // Fetch sender user
    Optional<User> senderOptional = userRepository.findUserByEmail(senderEmail);
    if (senderOptional.isEmpty()) {
      throw new DataNotFoundException("User with email " + senderEmail + " does not exist");
    }
    User sender = senderOptional.get();

    //this means that it is addressing for office manager
    if (inboxCreateDto.getReceiversEmail().isEmpty()) {
      //get office manager email
      Optional<Department> departmentOptional = departmentRepository.findDepartmentByBin(sender.getOrganizationBin());
      if (departmentOptional.isEmpty())
        throw new DataNotFoundException("Department by id neither null or doesnt exist {}" + sender.getOrganisationId());

      Optional<User> managerOptional = userRepository.findById(departmentOptional.get().getManagerID());
      if (managerOptional.isEmpty())
        throw new DataNotFoundException("User by id {}" + departmentOptional.get().getId() + ", does not exist");

      inboxCreateDto.setReceiversEmail(Collections.singletonList(managerOptional.get().getEmail()));
    }

    if (inboxCreateDto == null) {
      throw new IllegalArgumentException("InboxCreateDto cannot be null");
    }

    // Validate and create PDFDocument
    DocumentPDF documentPDF = DocumentPDF.builder()
            .name(inboxCreateDto.getName())
            .fileData(inboxCreateDto.getFileData())
            .createdTime(String.valueOf(currentDateTime))
            .status(DocumentStatus.WAITING)
            .build();

    // Fetch receiver users
    List<String> receiverEmails = inboxCreateDto.getReceiversEmail();
    if (receiverEmails == null || receiverEmails.isEmpty()) {
      throw new DataNotFoundException("Receiver emails are empty");
    }

    //to validate that user email exist in the system
    List<User> receivers = userRepository.findByEmails(receiverEmails);
    System.out.println(receivers);
    if (receivers.isEmpty()) {
      throw new DataNotFoundException("No valid receivers found for provided emails");
    }

    // Create sign processes
    List<InboxReceivers> signProcesses = new ArrayList<>();
    for (User receiver : receivers) {
      signProcesses.add(InboxReceivers.builder()
              .date(String.valueOf(currentDateTime))
              .documentStatus(DocumentStatus.WAITING)
              .userEmail(receiver.getEmail())
              .build());
    }

    // Set first user as signing
    if (!signProcesses.isEmpty()) {
      signProcesses.get(0).setDocumentStatus(DocumentStatus.SIGNING);
    }

    // Create and save Inbox
    Inbox inbox = Inbox.builder()
            .documentPDF(documentPDF)
            .receivers(signProcesses)
            .sender(sender)
            .build();
    inboxRepository.save(inbox);

    logger.info("Inbox created successfully with ID: " + inbox.getId());
  }

  @Override
  public void setNewReceiversToInbox(String inboxId, ReceiversAddInboxDto receiversAddInboxDto) {
    Optional<Inbox> optionalInbox = inboxRepository.findById(inboxId);
    if (optionalInbox.isEmpty())
      throw new DataNotFoundException("Inbox by id does not exist {}" + inboxId);

    if (receiversAddInboxDto.getEmails().isEmpty())
      throw new IllegalArgumentException("Receivers list is null email");

    Inbox inbox = optionalInbox.get();
    //to validate that users email exist in the system
    List<User> receivers = userRepository.findByEmails(receiversAddInboxDto.getEmails());
    if (receivers.isEmpty()) {
      throw new DataNotFoundException("No valid receivers found for provided emails");
    }

    List<InboxReceivers> signProcesses = new ArrayList<>();
    for (String email : receiversAddInboxDto.getEmails()) {
      signProcesses.add(InboxReceivers.builder()
              .date(String.valueOf(currentDateTime))
              .documentStatus(DocumentStatus.WAITING)
              .userEmail(email)
              .build());
    }

    // Set first user as signing
    if (!signProcesses.isEmpty()) {
      signProcesses.get(0).setDocumentStatus(DocumentStatus.SIGNING);
    }
    //setting office manager status as accepted
    if(inbox.getReceivers().size() == 1)
    {
      inbox.getReceivers().get(0).setDocumentStatus(DocumentStatus.ACCEPTED);
    }

    inbox.getReceivers().addAll(signProcesses);
    inboxRepository.save(inbox);
  }

  @Override
  public String deleteOutboxById(String id, String senderEmail) throws IllegalAccessException {
    Optional<Inbox> optionalInbox = inboxRepository.findById(id);
    if(optionalInbox.isEmpty())
      throw new DataNotFoundException("Inbox by id " + id + ", doesnt exist");
    Inbox inbox = optionalInbox.get();
    if(!inbox.getSender().getEmail().equals(senderEmail))
    {
      throw new IllegalAccessException("User by email" + senderEmail + ", doesnt have access to inbox by id " + id);
    }
    inboxRepository.delete(inbox);
    return inbox.getId();
  }

  @Override
  public List<AllInboxesDto> getInboxesByReceiver(String receiverEmail) {
    // on this method receiver only can see sender email, but cannot see who
    // also will participate on signing process

    List<Inbox> inboxes = inboxRepository.findAllByReceiverEmail(receiverEmail);

    return inboxes.stream()
            .map(inbox -> {
              Optional<InboxReceivers> matchingSignProcess = inbox.getReceivers().stream()
                      .filter(inboxReceivers -> inboxReceivers.getUserEmail().equals(receiverEmail))
                      .findFirst();

              DocumentStatus documentStatus = matchingSignProcess
                      .map(InboxReceivers::getDocumentStatus)
                      .orElse(null); // or handle the case where it is not found

              return AllInboxesDto.builder()
                      .inboxId(inbox.getId())
                      .documentStatus(documentStatus)
                      .senderEmail(inbox.getSender().getEmail())
                      .createdDate(inbox.getDocumentPDF().getCreatedTime())
                      .documentTitle(inbox.getDocumentPDF().getName())
                      .build();
            })
            .collect(Collectors.toList());
  }

  @Override
  public InboxDto getInboxByIdAndUserEmail(
          String inboxId,
          String email
  ) throws IllegalAccessException {
    Optional<Inbox> optionalInbox = inboxRepository.findById(inboxId);

    if (optionalInbox.isEmpty())
      throw new DataNotFoundException("Inbox with id " + inboxId + " does not exist in the system ");

    Inbox inbox = optionalInbox.get();

    Optional<InboxReceivers> receiverOptional = inbox.getReceivers()
            .stream()
            .filter(receiver -> receiver.getUserEmail().equals(email))
            .findFirst();

    if (receiverOptional.isEmpty())
      throw new IllegalAccessException("User by email {}" + email +
              ", has not access to inbox by id{}" + inboxId);

//    checking that user has access to sign this document
//    for (SignProcess signProcess : inbox.getReceivers()) {
//      if (email.equals(signProcess.getUserEmail()) &&
//              !signProcess.getDocumentStatus().equals(DocumentStatus.SIGNING))
//        throw new IllegalAccessException("User by email {}" + email +
//                ", does not have access to sign this document");
//
//    }

    InboxDto inboxDto = InboxDto.builder()
            .inboxId(inboxId)
            .documentDto(DocumentDto.builder()
                    .createdTime(inbox.getDocumentPDF().getCreatedTime())
                    .fileData(inbox.getDocumentPDF().getFileData())
                    .name(inbox.getDocumentPDF().getName())
                    .status(inbox.getDocumentPDF().getStatus())
                    .build())
            .sender(InboxViewDto.builder()
                    .firstName(inbox.getSender().getFirstName())
                    .lastName(inbox.getSender().getLastName())
                    .email(inbox.getSender().getEmail())
                    .remark(inbox.getRejectReason())
                    .build())
            .receivers(inbox.getReceivers())
            .build();

    if (inboxDto.getDocumentDto().getStatus().equals(DocumentStatus.REJECTED))
      inboxDto.setRemark(inbox.getRejectReason());

    return inboxDto;
  }


  @Override
  public Optional<Inbox> getInboxById(String inboxId) {
    return inboxRepository.findById(inboxId);
  }

  @Override
  public void rejectDocument(InboxRejectDto rejectDocumentDto, String email) throws IllegalAccessException {
    Optional<Inbox> optionalInbox = inboxRepository.findById(rejectDocumentDto.getInboxId());
    if (optionalInbox.isEmpty()) {
      throw new DataNotFoundException("Inbox by id " + rejectDocumentDto.getInboxId() + " does not exist");
    }

    Inbox inbox = optionalInbox.get();

    // Initialize AtomicBoolean for thread-safe updating within the stream
    AtomicBoolean foundAndUpdated = new AtomicBoolean(false);

    // Find and update the SignProcess for the given email
    List<InboxReceivers> updatedSignProcesses = inbox.getReceivers().stream().map(signProcess -> {
      if (signProcess.getUserEmail().equals(email)) {
        signProcess.setDocumentStatus(DocumentStatus.REJECTED);
        foundAndUpdated.set(true); // Update flag using AtomicBoolean
      }
      return signProcess;
    }).collect(Collectors.toList());

    if (!foundAndUpdated.get()) { // Check the flag using AtomicBoolean
      throw new IllegalAccessException("User by email " + email + " does not have access to reject this document");
    }

    // Update the list of receivers in the inbox
    inbox.setReceivers(updatedSignProcesses);

    // Set the reject reason and update the document status to REJECTED
    inbox.setRejectReason(rejectDocumentDto.getReasonToReject());
    inbox.getDocumentPDF().setStatus(DocumentStatus.REJECTED);

    // Save the updated Inbox
    inboxRepository.save(inbox);
  }


  @Override
  public void deleteInboxById(String inboxId, String userEmail) {
    Optional<Inbox> inboxOptional = inboxRepository.findById(inboxId);
    if (inboxOptional.isEmpty())
      throw new DataNotFoundException("Inbox by id {}" + inboxId + ", does not exist");

    Inbox inbox = inboxOptional.get();

    // Find and update the SignProcess for the given email
    List<InboxReceivers> updatedSignProcesses = inbox.getReceivers()
            .stream()
            .filter(signProcess -> !signProcess.getUserEmail().equals(userEmail))
            .collect(Collectors.toList());

    // Update the list of receivers in the inbox
    inbox.setReceivers(updatedSignProcesses);

    // Save the updated Inbox
    inboxRepository.save(inbox);
  }

  @Override
  public List<AllSendInboxesDto> getAllSendInboxes(User user) {
    List<Inbox> inboxes = inboxRepository.findAllBySenderId(user.getId());
    return inboxes.stream().map(inbox -> AllSendInboxesDto.builder()
                    .inboxId(inbox.getId())
                    .documentStatus(inbox.getDocumentPDF().getStatus())
                    .receivers(inbox.getReceivers())
                    .createdDate(inbox.getDocumentPDF().getCreatedTime())
                    .rejectReason(inbox.getRejectReason())
                    .documentTitle(inbox.getDocumentPDF().getName())
                    .build()
            )
            .collect(Collectors.toList());
  }

  @Override
  public Inbox signInbox(String inboxId, byte[] fileData, String signerEmail) throws IllegalAccessException {
    Optional<Inbox> optionalInbox = inboxRepository.findById(inboxId);
    if (optionalInbox.isEmpty()) {
      throw new DataNotFoundException("Inbox by id " + inboxId + " does not exist");
    }

    Inbox inbox = optionalInbox.get();
    if (inbox.getDocumentPDF().getStatus().equals(DocumentStatus.REJECTED)) {
      throw new IllegalAccessException("Inbox by +" + inboxId + ", is rejected");
    }

    // Find the matching SignProcess for the signerEmail
    InboxReceivers matchingSignProcess = inbox.getReceivers().stream()
            .filter(signProcess -> signProcess.getUserEmail().equals(signerEmail))
            .findFirst()
            .orElseThrow(() -> new IllegalAccessException("User by email " + signerEmail +
                    " does not have access to sign this document"));

    // Check if the current status is SIGNING
    if (!matchingSignProcess.getDocumentStatus().equals(DocumentStatus.SIGNING)) {
      throw new IllegalAccessException("User by email " + signerEmail +
              " does not have access to sign this document");
    }

    // Update the current signer's status to ACCEPTED
    matchingSignProcess.setDocumentStatus(DocumentStatus.ACCEPTED);

    // Find the index of the current SignProcess
    int currentIndex = inbox.getReceivers().indexOf(matchingSignProcess);
    int nextIndex = currentIndex + 1;

    // Update the next signer's status to SIGNING if they exist
    if (nextIndex < inbox.getReceivers().size()) {
      inbox.getReceivers().get(nextIndex).setDocumentStatus(DocumentStatus.SIGNING);
    }

    // Check if all signers have accepted
    boolean allAccepted = inbox.getReceivers()
            .stream()
            .allMatch(signProcess ->
                    signProcess.getDocumentStatus() == DocumentStatus.ACCEPTED
            );

    // Update the document's status based on allAccepted
    if (allAccepted) {
      inbox.getDocumentPDF().setStatus(DocumentStatus.COMPLETED);
    } else {
      inbox.getDocumentPDF().setStatus(DocumentStatus.WAITING);
    }

    // Update the document with the signed file data
    inbox.getDocumentPDF().setFileData(fileData);

    // Save the updated Inbox
    inboxRepository.save(inbox);
    return inbox;
  }
}
