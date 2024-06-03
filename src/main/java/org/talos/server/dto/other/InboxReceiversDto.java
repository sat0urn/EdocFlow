package org.talos.server.dto.other;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.talos.server.entity.DocumentStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InboxReceiversDto {
    private String userEmail;
    private String date;
    private DocumentStatus documentStatus;

}
