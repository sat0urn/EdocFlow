package org.talos.server.dto.inboxes_dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class InboxViewDto {
  private String firstName;
  private String lastName;
  private String email;
  private String remark;
}
