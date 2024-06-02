package org.talos.server.dto;

import lombok.*;

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
