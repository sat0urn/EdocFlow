package org.talos.server.dto.inboxes_dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class InboxCreateDto {
    private String name;
    private byte[] fileData;
    private String remark;
    private List<String> receiversEmail;
}
