package org.talos.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.talos.server.dto.UserLoginDto;
import org.talos.server.dto.UserRegistrationDto;
import org.talos.server.responses.AuthenticationResponse;
import org.talos.server.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/registration")
    public ResponseEntity<AuthenticationResponse> registration(
            @RequestBody UserRegistrationDto userRegistrationDto
    ) {
        return ResponseEntity.ok(userService.registrateUser(userRegistrationDto));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody UserLoginDto userLoginDto
    ) {
        return ResponseEntity.ok(userService.loginUser(userLoginDto));
    }

    @GetMapping("/auth")
    public ResponseEntity<AuthenticationResponse> auth(
            @RequestHeader("Authorization") String authHeader
    ) {
        return ResponseEntity.ok(userService.isTokenExpired(authHeader));
    }
}
