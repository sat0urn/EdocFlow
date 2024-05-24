package org.talos.server.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.talos.server.config.JwtService;
import org.talos.server.dto.PDFDocumentDto;
import org.talos.server.entity.PDFDocument;
import org.talos.server.entity.User;
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

    @Override
    public void saveUserPdf(
            PDFDocumentDto pdfDocumentDto,
            String authHeader
    ) {
        String userEmail = jwtService.extractUsername(authHeader.substring(7));
        Optional<User> userOptional = userRepository.findUserByEmail(userEmail);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<PDFDocument> pdfDocumentList = user.getDocuments();

            var pdfDocument = PDFDocument.builder()
                    .name(pdfDocumentDto.getName())
                    .fileData(pdfDocumentDto.getFileData())
                    .createdTime(pdfDocumentDto.getCreatedTime())
                    .status(pdfDocumentDto.getStatus())
                    .build();

            pdfDocumentList.add(pdfDocument);
            user.setDocuments(pdfDocumentList);
            userRepository.save(user);
        }
    }
    @Override
    public List<PDFDocument> listUserDocuments(String authHeader) {
        String userEmail = jwtService.extractUsername(authHeader.substring(7));
        Optional<User> userOptional = userRepository.findUserByEmail(userEmail);
        return userOptional.isPresent() ? userOptional.get().getDocuments() : new ArrayList<>();
    }
}
