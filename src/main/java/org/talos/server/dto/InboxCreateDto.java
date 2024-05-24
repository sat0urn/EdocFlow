package org.talos.server.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class InboxCreateDto {
    private String name;
    private byte[] fileData;
    private String createdTime;
    private String status;
    private String receiverEmail;
}
