package org.talos.springtest2.responses;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegistrationResponse {
    String message;
    Boolean status;

    public RegistrationResponse(String message, Boolean status) {
        this.message = message;
        this.status = status;
    }
}
