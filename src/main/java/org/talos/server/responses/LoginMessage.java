package org.talos.server.responses;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginMessage {
    String message;
    Boolean status;

    public LoginMessage(String message, Boolean status) {
        this.message = message;
        this.status = status;
    }
}
