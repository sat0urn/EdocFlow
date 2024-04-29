package org.talos.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserRegistrationDto {
    private String email;
    private String firstName;
    private String lastName;
    private Long phoneNumber;
    private String password;
    private String country;
    private String city;
}
