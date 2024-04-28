package org.talos.server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private String id;
    private String email;
    private String name;
    private String surName;
    private Long phoneNumber;
    private String password;
    private String country;
    private String city;
  //  @DBRef uncommit if one document will belong to different users
    private List<PDFDocument> documents;
}
