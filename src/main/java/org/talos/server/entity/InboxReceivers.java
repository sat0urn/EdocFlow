package org.talos.server.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InboxReceivers {
    private String userEmail;
    private DocumentStatus documentStatus;
    private String date;
}
