package org.talos.springtest2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserRegistrationDto {
    private Long id;
    private String email;
    private String name;
    private String surName;
    private Long phoneNumber;
    private String password;
    private String country;
    private String city;
}
