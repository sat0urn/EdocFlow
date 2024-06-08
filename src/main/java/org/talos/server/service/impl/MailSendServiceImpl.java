package org.talos.server.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.talos.server.service.MailSendService;
@Service
@AllArgsConstructor
public class MailSendServiceImpl implements MailSendService {
/*    @Value("${spring.mail.username}")
    private String senderEmail;*/

    private final JavaMailSender javaMailSender;
    @Override
    public void sendEmail(String toEmail, String subject, String text) {
        String sub = "Edoc-flow," + subject;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("zeyin03@gmail.com");
        message.setTo(toEmail);
        message.setSubject(sub);
        message.setText(text);

        javaMailSender.send(message);

    }
}
