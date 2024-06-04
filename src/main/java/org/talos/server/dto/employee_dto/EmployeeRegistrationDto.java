package org.talos.server.dto.employee_dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class EmployeeRegistrationDto {
    private String name;
    private String surname;
    private String iin;
    private String email;
    private String position;
    private Long phoneNumber;
    private String password;
    private String departmentId;
}
