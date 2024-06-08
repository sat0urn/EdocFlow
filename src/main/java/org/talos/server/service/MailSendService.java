package org.talos.server.service;

public interface MailSendService {
    public void sendEmail(String toEmail, String subject, String text);
}
