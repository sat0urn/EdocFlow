package org.talos.server.controller;

import io.jsonwebtoken.Claims;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.talos.server.config.JwtService;
import org.talos.server.dto.SelectUsersToSignDto;
import org.talos.server.dto.UpdatePasswordDto;
import org.talos.server.dto.UserLoginDto;
import org.talos.server.dto.UserRegistrationDto;
import org.talos.server.entity.Department;
import org.talos.server.entity.User;
import org.talos.server.responses.AuthenticationResponse;
import org.talos.server.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping("/registration")
    public ResponseEntity<AuthenticationResponse> registration(
            @RequestBody UserRegistrationDto userRegistrationDto
    ) {
        AuthenticationResponse authenticationResponse = userService.registrateUser(userRegistrationDto);
        if (authenticationResponse.getToken().isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            return ResponseEntity.ok(authenticationResponse);
        }
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
    public ResponseEntity<String> updateUserPassword(
            @RequestBody UpdatePasswordDto updatePasswordDto,
            @RequestHeader("Authorization") String authHeader
    ) {
        String email = jwtService.extractClaim(authHeader.substring(7), Claims::getSubject);

        Optional<User> user = userService.getUserByEmail(email);

        if (user.isEmpty())
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("User not found for email: " + email);

        User existingUser = user.get();
        if (!passwordEncoder.matches(updatePasswordDto.getOldPassword(), existingUser.getPassword()))
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("Current password is incorrect.");

        existingUser.setPassword(passwordEncoder.encode(updatePasswordDto.getNewPassword()));
        userService.updateUser(existingUser);
        return ResponseEntity.ok("Password updated successfully!");
    }

    @GetMapping("/getAll/{id}")
    private List<SelectUsersToSignDto> getAllUsersWorkingOnDepartment(
            @PathParam("id") String id
    ) {
        Department department = userService.getDepartmentByUserId(id);

        return userService.getAllUsersByDepartment(department);
    }

    @GetMapping("/getAllEmails")
    private List<String> getAllEmails(
            @RequestHeader("Authorization") String authHeader
    ) {
        String email = jwtService.extractClaim(authHeader.substring(7), Claims::getSubject);
        return userService.getAllUsersEmailsExceptYours(email);
    }
}
