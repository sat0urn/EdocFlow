package org.talos.server.service.impl;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.talos.server.config.JwtService;
import org.talos.server.dto.employee_dto.EmployeeRegistrationDto;
import org.talos.server.dto.users_dto.SelectUsersToSignDto;
import org.talos.server.dto.users_dto.UserLoginDto;
import org.talos.server.dto.users_dto.UserRegistrationDto;
import org.talos.server.entity.Department;
import org.talos.server.entity.Role;
import org.talos.server.entity.User;
import org.talos.server.exception.DataNotFoundException;
import org.talos.server.repository.DepartmentRepository;
import org.talos.server.repository.UserRepository;
import org.talos.server.responses.AuthenticationResponse;
import org.talos.server.service.UserService;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;
  private final DepartmentRepository departmentRepository;
  private final PasswordEncoder passwordEncoder;

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
              .role(Role.INDEPENDENT_USER)
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

    var checkUser = userRepository.findUserByEmail(loginDTO.getEmail());
    if (checkUser.isPresent()) {
      String jwtToken = "";
      User user = checkUser.get();
      var claims = new HashMap<String, Object>(Map.of(
              "firstName", user.getFirstName(),
              "lastName", user.getLastName(),
              "phoneNumber", user.getPhoneNumber(),
              "country", user.getCountry(),
              "city", user.getCity(),
              "role", user.getRole()
      ));

      switch (user.getRole()) {
        case OFFICE_MANAGER:
          var checkDepartment = departmentRepository.findDepartmentByManagerID(user.getId());
          if (checkDepartment.isEmpty()) {
            throw new DataNotFoundException("Department not found");
          }
          claims.put("companyBin", checkDepartment.get().getBin());
          claims.put("companyName", checkDepartment.get().getDepartmentName());
          jwtToken = jwtService.generateToken(claims, user);
          break;
        case EMPLOYEE:
          claims.put("orgId", user.getOrganisationId());
          claims.put("position", user.getPosition());
          jwtToken = jwtService.generateToken(claims, user);
          break;
        case ADMIN:
          break;
        default:
          jwtToken = jwtService.generateToken(claims, user);
      }

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
  public void saveUsersPdf(String documentId, String userEmail) {
    Optional<User> userSender = userRepository.findUserByEmail(userEmail);
    if (userSender.isEmpty())
      throw new DataNotFoundException("user not found by email {}" + userEmail);
    List<String> senderDocuments = userSender.get().getDocumentIds();
    senderDocuments.add(documentId);
    userSender.get().setDocumentIds(senderDocuments);
    userRepository.save(userSender.get());
  }

  @Override
  public String registrateEmployee(EmployeeRegistrationDto employeeRegistrationDto, String authHeader) {
    String managerEmail = jwtService.extractUsername(authHeader.substring(7));
    var checkManager = userRepository.findUserByEmail(managerEmail);

    if (checkManager.isPresent() && checkManager.get().getRole().equals(Role.OFFICE_MANAGER)) {
      var checkUser = userRepository.findUserByEmailOrIin(employeeRegistrationDto.getEmail(), employeeRegistrationDto.getIin());
      var checkDepartment = departmentRepository.findDepartmentByManagerID(checkManager.get().getId());

      if (checkUser.isEmpty() && checkDepartment.isPresent()) {
        String passFirstPart = Role.EMPLOYEE.name().toLowerCase();
        String passSecondPart = employeeRegistrationDto.getIin().substring(0, 6);
        String passThirdPart = String.valueOf(employeeRegistrationDto.getPhoneNumber());
        String new_password = passFirstPart + passSecondPart + passThirdPart.substring(passThirdPart.length() - 4);
        System.out.println(new_password);
        var user = User.builder()
                // default user fields
                .firstName(employeeRegistrationDto.getName())
                .lastName(employeeRegistrationDto.getSurname())
                .phoneNumber(employeeRegistrationDto.getPhoneNumber())
                .email(employeeRegistrationDto.getEmail())
                .country(checkManager.get().getCountry())
                .city(checkManager.get().getCity())
                .password(passwordEncoder.encode(new_password))
                // employee user fields
                .position(employeeRegistrationDto.getPosition())
                .iin(employeeRegistrationDto.getIin())
                .organisationId(employeeRegistrationDto.getDepartmentId())
                .organizationBin(checkDepartment.get().getBin())
                // role
                .role(Role.EMPLOYEE)
                .build();

        userRepository.save(user);

        return "EMPLOYEE_REGISTERED";
      } else {
        return "WARN_EMPLOYEE_EXISTS";
      }
    } else {
      return "WARN_MANAGER_DOES_NOT_EXIST";
    }
  }

  @Override
  public List<SelectUsersToSignDto> getAllEmployeeByDepartment(
          String managerEmail
  ) throws IllegalAccessException {
    Optional<User> optionalUser = userRepository.findUserByEmail(managerEmail);
    if (optionalUser.isEmpty())
      throw new DataNotFoundException("user not found by email {}" + managerEmail);

    User userManager = optionalUser.get();
    if (!userManager.getRole().equals(Role.OFFICE_MANAGER))
      throw new IllegalAccessException("User by email {}" + managerEmail + ", has not access to this api");

    Optional<Department> optionalDepartment = departmentRepository.findDepartmentByManagerID(userManager.getId());
    if (optionalDepartment.isEmpty())
      throw new DataNotFoundException("Department by manager id  +" + userManager.getId() + ", does not exist");

    List<User> userList = userRepository.findAllByOrganizationBin(optionalDepartment.get().getBin());

    return userList.stream()
            .map(user -> SelectUsersToSignDto.builder()
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .orgId(user.getOrganisationId())
                    .iin(user.getIin())
                    .email(user.getEmail())
                    .phoneNumber(String.valueOf(user.getPhoneNumber()))
                    .position(user.getPosition())
                    .build()).collect(Collectors.toList());
  }

  @Override
  public void updateEmployee(SelectUsersToSignDto userToChange) {
    Optional<User> userOptional = userRepository.findUserByEmail(userToChange.getEmail());
    if(userOptional.isEmpty())
      throw new DataNotFoundException("user by email" + userToChange.getEmail() + ", does not exist");
    User user = userOptional.get();
    user.setFirstName(userToChange.getFirstName());
    user.setLastName(userToChange.getLastName());
    user.setOrganisationId(userToChange.getOrgId());
    user.setIin(userToChange.getIin());
    user.setPhoneNumber(Long.valueOf(userToChange.getPhoneNumber()));
    user.setPosition(userToChange.getPosition());
    userRepository.save(user);



  }

  @Override
  public List<String> getIndependentUsersEmails(String email) {
    List<User> onlyEmailsAndRoles = userRepository.findAllEmailAndRoles();
    return onlyEmailsAndRoles.stream()
            .filter(er -> !er.getEmail().equals(email) && er.getRole().equals(Role.INDEPENDENT_USER))
            .map(User::getEmail)
            .toList();
  }
}
