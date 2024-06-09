package org.talos.server.dto.users_dto;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SelectUsersToSignDto {
  private String firstName;
  private String lastName;
  private String orgId;
  private String iin;
  private String phoneNumber;
  private String email;
  private String position;
  private List<String> documentIds;
}
