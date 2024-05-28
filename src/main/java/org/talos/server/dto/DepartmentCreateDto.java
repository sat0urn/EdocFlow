package org.talos.server.dto;

import lombok.*;

@Data
@AllArgsConstructor
@Getter
@Setter
@Builder
public class DepartmentCreateDto {
    private String departmentName;
    private String country;
    private String city;
    private String address;
    private String bin;
    private String managerIIN;
}
