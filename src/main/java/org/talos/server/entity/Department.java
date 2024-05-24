package org.talos.server.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "department")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Department {
    private String id;
    private String name;
    private String location;
    private String biin;
}
