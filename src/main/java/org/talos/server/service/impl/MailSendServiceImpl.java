package org.talos.server.service.impl;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.talos.server.exception.DataNotFoundException;
import org.talos.server.service.MailSendService;

@Service
@RequiredArgsConstructor
public class MailSendServiceImpl implements MailSendService {

    @Value("${spring.mail.username}")
    private String senderEmail;
    private final JavaMailSender javaMailSender;

    @Override
    public void sendEmail(String toEmail, String subject, String text) {
        String sub = "Edoc-flow," + subject;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(senderEmail);
        message.setTo(toEmail);
        message.setSubject(sub);
        message.setText(text);

        try {
            javaMailSender.send(message);

        } catch (MailException ex) {
            throw new DataNotFoundException("Email by gmail:" +toEmail + ", does not exist");
            // Handle the exception as needed
        }

    }
}
