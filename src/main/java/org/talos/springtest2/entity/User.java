package org.talos.springtest2.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Long id;
    private String email;
    private String name;
    private String surName;
    private Long phoneNumber;
    private String password;
    private String country;
    private String city;
}
