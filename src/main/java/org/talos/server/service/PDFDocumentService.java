package org.talos.server.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.talos.server.config.JwtService;
import org.talos.server.entity.PDFDocument;
import org.talos.server.entity.User;
import org.talos.server.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PDFDocumentService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public void saveUserPdf(String name, byte[] content, String authHeader) {
        String userEmail = jwtService.extractUsername(authHeader.substring(7));
        Optional<User> userOptional = userRepository.findUserByEmail(userEmail);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<PDFDocument> pdfDocumentList = user.getDocuments();
            PDFDocument pdfDocument = new PDFDocument();
            pdfDocument.setName(name);
            pdfDocument.setFileData(content);
            pdfDocumentList.add(pdfDocument);
            user.setDocuments(pdfDocumentList);
            userRepository.save(user);
        }
    }

    public List<PDFDocument> listUserDocuments(String authHeader) {
        String userEmail = jwtService.extractUsername(authHeader.substring(7));
        Optional<User> userOptional = userRepository.findUserByEmail(userEmail);
        return userOptional.isPresent() ? userOptional.get().getDocuments() : new ArrayList<>();
    }
}
