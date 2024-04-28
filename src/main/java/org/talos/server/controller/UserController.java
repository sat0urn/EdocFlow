package org.talos.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.talos.server.dto.UserLoginDto;
import org.talos.server.dto.UserRegistrationDto;
import org.talos.server.responses.LoginMessage;
import org.talos.server.responses.RegistrationResponse;
import org.talos.server.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registration(@RequestBody UserRegistrationDto userRegistrationDto) {
        RegistrationResponse registrateUser = userService.registrateUser(userRegistrationDto);
        return ResponseEntity.ok(registrateUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDto userLoginDto) {
        LoginMessage loginResponse = userService.loginUser(userLoginDto);
        return ResponseEntity.ok(loginResponse);
    }
}
