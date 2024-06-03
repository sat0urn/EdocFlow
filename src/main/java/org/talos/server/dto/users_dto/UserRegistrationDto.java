package org.talos.server.dto.users_dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.talos.server.entity.PDFDocument;

import java.util.ArrayList;
import java.util.List;

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
    private List<PDFDocument> documents = new ArrayList<>();
}
