package org.talos.server.controller;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.talos.server.config.JwtService;
import org.talos.server.dto.other.EmailDTO;
import org.talos.server.dto.other.VerificationRequestDto;
import org.talos.server.dto.users_dto.ForgetPasswordDto;
import org.talos.server.dto.users_dto.UpdatePasswordDto;
import org.talos.server.dto.users_dto.UserLoginDto;
import org.talos.server.dto.users_dto.UserRegistrationDto;
import org.talos.server.entity.User;
import org.talos.server.responses.AuthenticationResponse;
import org.talos.server.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

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
    AuthenticationResponse authenticationResponse = userService.loginUser(userLoginDto);
    if (authenticationResponse.getToken().isEmpty()) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    } else {
      return ResponseEntity.ok(authenticationResponse);
    }
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

  @GetMapping("/getAllEmails")
  private List<String> getAllEmails(
          @RequestHeader("Authorization") String authHeader
  ) {
    String email = jwtService.extractClaim(authHeader.substring(7), Claims::getSubject);
    return userService.getIndependentUsersEmails(email);
  }

  @PostMapping("/validate-email")
  public ResponseEntity<?> validateEmail(@RequestBody EmailDTO emailDTO) {
    System.out.println(emailDTO.getEmail());
    Optional<User> optionalUser = userService.getUserByEmail(emailDTO.getEmail());
    if (optionalUser.isPresent()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User by gmail" + emailDTO.getEmail() + "  exist");
    }
    if (!userService.isValidGmail(emailDTO.getEmail())) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Gmail address.");
    }

    userService.sendVerificationCode(emailDTO.getEmail());
    return ResponseEntity.ok("Verification code sent.");
  }

  @PostMapping("/verify-code")
  public ResponseEntity<?> verifyCode(@RequestBody VerificationRequestDto request) {
    System.out.println(request.getEmail());
    System.out.println(request.getCode());
    boolean isValid = userService.verifyCode(request.getEmail(), request.getCode());

    if (!isValid) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid verification code.");
    }

    return ResponseEntity.ok("User verified successfully");
  }

  @PatchMapping("/forget-password")
  public ResponseEntity<String> forgetPasswordUpdate(
          @RequestBody ForgetPasswordDto forgetPasswordDto

  ) {


    Optional<User> user = userService.getUserByEmail(forgetPasswordDto.getGmail());

    if (user.isEmpty())
      return ResponseEntity
              .status(HttpStatus.NOT_FOUND)
              .body("User not found for email: " + forgetPasswordDto.getGmail());

    User existingUser = user.get();


    existingUser.setPassword(passwordEncoder.encode(forgetPasswordDto.getPassword()));
    userService.updateUser(existingUser);
    return ResponseEntity.ok("Password updated successfully!");
  }
}
