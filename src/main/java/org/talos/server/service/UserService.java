package org.talos.server.service;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.talos.server.config.JwtService;
import org.talos.server.dto.UserLoginDto;
import org.talos.server.dto.UserRegistrationDto;
import org.talos.server.entity.Role;
import org.talos.server.entity.User;
import org.talos.server.repository.UserRepository;
import org.talos.server.responses.AuthenticationResponse;

import java.util.Date;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse registrateUser(UserRegistrationDto userRegistrationDto) {
        var checkUser = userRepository.findUserByEmail(userRegistrationDto.getEmail());
        if (checkUser.isEmpty()) {
            var user = User.builder()
                    .firstName(userRegistrationDto.getFirstName())
                    .lastName(userRegistrationDto.getLastName())
                    .phoneNumber(userRegistrationDto.getPhoneNumber())
                    .country(userRegistrationDto.getCountry())
                    .city(userRegistrationDto.getCity())
                    .email(userRegistrationDto.getEmail())
                    .documents(userRegistrationDto.getDocuments())
                    .password(passwordEncoder.encode(userRegistrationDto.getPassword()))
                    .role(Role.USER)
                    .build();

            userRepository.save(user);

            var jwtToken = jwtService.generateToken(Map.of(
                    "firstName", user.getFirstName(),
                    "lastName", user.getLastName(),
                    "phoneNumber", user.getPhoneNumber(),
                    "country", user.getCountry(),
                    "city", user.getCity(),
                    "role", user.getRole()
            ), user);

            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        } else {
            return AuthenticationResponse.builder()
                    .token("")
                    .build();
        }
    }

    public AuthenticationResponse loginUser(UserLoginDto loginDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getEmail(),
                        loginDTO.getPassword()
                )
        );

        var user = userRepository.findUserByEmail(loginDTO.getEmail())
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found")
                );

        var jwtToken = jwtService.generateToken(Map.of(
                "firstName", user.getFirstName(),
                "lastName", user.getLastName(),
                "phoneNumber", user.getPhoneNumber(),
                "country", user.getCountry(),
                "city", user.getCity(),
                "role", user.getRole()
        ), user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse isTokenExpired(String authHeader) {
        String token = authHeader.substring(7);
        boolean isExpired = jwtService.extractClaim(token, Claims::getExpiration).before(new Date());

        if (isExpired) {
            return new AuthenticationResponse("");
        } else {
            return new AuthenticationResponse(token);
        }
    }
}
