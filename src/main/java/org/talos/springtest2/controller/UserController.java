package org.talos.springtest2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.talos.springtest2.dto.UserLoginDto;
import org.talos.springtest2.dto.UserRegistrationDto;
import org.talos.springtest2.responses.LoginMessage;
import org.talos.springtest2.responses.RegistrationResponse;
import org.talos.springtest2.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registration(@RequestBody UserRegistrationDto userRegistrationDto) {
        System.out.println(userRegistrationDto);
        RegistrationResponse registrateUser = userService.registrateUser(userRegistrationDto);
        return ResponseEntity.ok(registrateUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDto userLoginDto) {
        LoginMessage loginResponse = userService.loginUser(userLoginDto);
        return ResponseEntity.ok(loginResponse);
    }
}
