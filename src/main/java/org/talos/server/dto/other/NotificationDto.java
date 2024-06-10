package org.talos.server.dto.other;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class NotificationDto {
    private String senderName;
    private String senderEmail;
    private Long phoneNumber;
    private String question;

}
