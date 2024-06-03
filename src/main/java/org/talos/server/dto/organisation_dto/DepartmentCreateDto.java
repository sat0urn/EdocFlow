package org.talos.server.dto.organisation_dto;

import lombok.*;
import org.talos.server.dto.users_dto.UserRegistrationDto;

@Data
@AllArgsConstructor
@Getter
@Setter
@Builder
public class DepartmentCreateDto {
    private String companyName;
    private String companyCountry;
    private String companyCity;
    private String companyAddress;
    private String companyBin;
    private String companyManagerIIN;
    private UserRegistrationDto companyManager;
}
