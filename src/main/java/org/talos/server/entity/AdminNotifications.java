package org.talos.server.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("admin_notifications")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AdminNotifications {
    @Id
    private String id;
    private String senderName;
    private String senderEmail;
    private Long phoneNumber;
    private String question;
}
