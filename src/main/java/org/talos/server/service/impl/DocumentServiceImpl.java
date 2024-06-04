package org.talos.server.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.talos.server.config.JwtService;
import org.talos.server.dto.document_dto.DocumentDto;
import org.talos.server.entity.DocumentPDF;
import org.talos.server.entity.DocumentStatus;
import org.talos.server.entity.Inbox;
import org.talos.server.entity.User;
import org.talos.server.exception.DataNotFoundException;
import org.talos.server.repository.DocumentRepository;
import org.talos.server.repository.UserRepository;
import org.talos.server.service.DocumentService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {

  private final UserRepository userRepository;
  private final JwtService jwtService;
  private final DocumentRepository documentRepository;

  @Override
  public void saveUserPdf(
          DocumentDto documentDto,
          String authHeader
  ) {
    String userEmail = jwtService.extractUsername(authHeader.substring(7));
    Optional<User> userOptional = userRepository.findUserByEmail(userEmail);
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      List<String> documentList = user.getDocumentIds();

      var document = DocumentPDF.builder()
              .name(documentDto.getName())
              .fileData(documentDto.getFileData())
              .createdTime(documentDto.getCreatedTime())
              .status(DocumentStatus.ACCEPTED)
              .build();
      documentRepository.save(document);

      documentList.add(document.getId());
      user.setDocumentIds(documentList);
      userRepository.save(user);
    }
  }

  @Override
  public List<DocumentPDF> listUserDocuments(String authHeader) {
    String userEmail = jwtService.extractUsername(authHeader.substring(7));
    Optional<User> userOptional = userRepository.findUserByEmail(userEmail);
    if (userOptional.isEmpty())
      throw new DataNotFoundException("User by email " + userEmail + " does not exist in the system");
    List<String> documentIds = userOptional.get().getDocumentIds();
    return documentRepository.findAllByIdIn(documentIds);
  }

  @Override
  public String saveDocument(Inbox inbox, byte[] fileData) {
    DocumentPDF documentPDF = DocumentPDF.builder()
            .status(DocumentStatus.ACCEPTED)
            .name(inbox.getDocumentPDF().getName())
            .fileData(fileData)
            .createdTime(inbox.getDocumentPDF().getCreatedTime())
            .build();
    documentRepository.save(documentPDF);
    return documentPDF.getId();
  }
}
