package org.talos.server.service.impl;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.talos.server.config.JwtService;
import org.talos.server.dto.SelectUsersToSignDto;
import org.talos.server.dto.UserLoginDto;
import org.talos.server.dto.UserRegistrationDto;
import org.talos.server.entity.Department;
import org.talos.server.entity.Inbox;
import org.talos.server.entity.Role;
import org.talos.server.entity.User;
import org.talos.server.exception.DataNotFoundException;
import org.talos.server.repository.UserRepository;
import org.talos.server.responses.AuthenticationResponse;
import org.talos.server.service.InboxService;
import org.talos.server.service.UserService;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final InboxService inboxService;

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
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
                    // убрал тут добавление документа так как у юзера при регистраций не должно быть документов
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
    @Override
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
    @Override
    public AuthenticationResponse isTokenExpired(String authHeader) {
        String token = authHeader.substring(7);
        boolean isExpired = jwtService.extractClaim(token, Claims::getExpiration).before(new Date());
        if (isExpired) {
            return new AuthenticationResponse("");
        } else {
            return new AuthenticationResponse(token);
        }
    }
    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }
    @Override
    public void updateUser(User existingUser) {
        userRepository.save(existingUser);
    }

    @Override
    public void saveUsersPdf(String documentId, String userId) {
      Optional<User> userSender = userRepository.findById(userId);
      if(userSender.isEmpty())
          throw new DataNotFoundException("user not found by id {}" + userId);
      List<String> senderDocuments = userSender.get().getDocumentIds();
      senderDocuments.add(documentId);
      userSender.get().setDocumentIds(senderDocuments);
      userRepository.save(userSender.get());






    }

    @Override
    public Department getDepartmentByUserId(String id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isEmpty())
            //throw exception
            throw new DataNotFoundException("No such user by id{}" + id);
        return user.get().getDepartment();


    }
    @Override
    public List<SelectUsersToSignDto> getAllUsersByDepartment(Department department) {
        if(department ==null)
            throw new IllegalArgumentException("Department is null");
        List<User> users = userRepository.findAllByDepartment(department);

        return users.stream()
                .map(user -> new SelectUsersToSignDto(user.getFirstName(), user.getLastName()))
                .collect(Collectors.toList());
    }
}
