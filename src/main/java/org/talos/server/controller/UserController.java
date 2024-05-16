package org.talos.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.talos.server.dto.UpdatePasswordDto;
import org.talos.server.dto.UserLoginDto;
import org.talos.server.dto.UserRegistrationDto;
import org.talos.server.entity.User;
import org.talos.server.responses.AuthenticationResponse;
import org.talos.server.service.UserService;

import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final PasswordEncoder passwordEncoder;
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

    @PatchMapping("/updatePassword")
    public ResponseEntity<String> updateUserPassword(@RequestBody UpdatePasswordDto updatePasswordDto)
    {
        Optional<User> user = userService.getUserByEmail(updatePasswordDto.getEmail());
        if(user.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).
                    body("User not found for email: " + updatePasswordDto.getEmail());

        User existingUser = user.get();
        if (!passwordEncoder.matches(updatePasswordDto.getOldPassword(), existingUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Current password is incorrect.");
        }
        existingUser.setPassword(passwordEncoder.encode(updatePasswordDto.getNewPassword()));
        userService.updateUser(existingUser);
        return ResponseEntity.ok("Password updated successfully!");



    }
}
