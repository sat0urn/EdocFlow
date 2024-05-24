package org.talos.server.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.talos.server.config.JwtService;
import org.talos.server.dto.PDFDocumentDto;
import org.talos.server.entity.DocumentStatus;
import org.talos.server.entity.PDFDocument;
import org.talos.server.entity.User;
import org.talos.server.exception.DataNotFoundException;
import org.talos.server.repository.PdfDocumentRepository;
import org.talos.server.repository.UserRepository;
import org.talos.server.service.PdfDocumentService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PDFDocumentServiceImpl implements PdfDocumentService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PdfDocumentRepository pdfDocumentRepository;

    @Override
    public void saveUserPdf(
            PDFDocumentDto pdfDocumentDto,
            String authHeader
    ) {
        String userEmail = jwtService.extractUsername(authHeader.substring(7));
        Optional<User> userOptional = userRepository.findUserByEmail(userEmail);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<String> pdfDocumentList = user.getDocumentIds();

            var pdfDocument = PDFDocument.builder()
                    .name(pdfDocumentDto.getName())
                    .fileData(pdfDocumentDto.getFileData())
                    .createdTime(pdfDocumentDto.getCreatedTime())
                    .status(DocumentStatus.ACCEPTED)
                    .build();
            pdfDocumentRepository.save(pdfDocument);

            pdfDocumentList.add(pdfDocument.getId());
            user.setDocumentIds(pdfDocumentList);
            userRepository.save(user);
        }
    }
    @Override
    public List<PDFDocument> listUserDocuments(String authHeader) {
        String userEmail = jwtService.extractUsername(authHeader.substring(7));
        Optional<User> userOptional = userRepository.findUserByEmail(userEmail);
        if(userOptional.isEmpty())
            throw new DataNotFoundException("User by email " + userEmail + " does not exist in the system");
        List<String> documentIds = userOptional.get().getDocumentIds();
        return pdfDocumentRepository.findAllByIdIn(documentIds);

    }
}
