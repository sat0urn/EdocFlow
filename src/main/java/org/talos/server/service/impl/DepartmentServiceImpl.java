package org.talos.server.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.talos.server.config.JwtService;
import org.talos.server.dto.DepartmentCreateDto;
import org.talos.server.dto.UserRegistrationDto;
import org.talos.server.entity.Department;
import org.talos.server.entity.Role;
import org.talos.server.entity.User;
import org.talos.server.repository.DepartmentRepository;
import org.talos.server.repository.UserRepository;
import org.talos.server.responses.AuthenticationResponse;
import org.talos.server.service.DepartmentService;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {
  private final DepartmentRepository departmentRepository;
  private final UserRepository userRepository;
  private final BCryptPasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  @Override
  public AuthenticationResponse createDepartment(DepartmentCreateDto departmentCreateDto) {
    var checkDepartment = departmentRepository.findDepartmentByBin(departmentCreateDto.getCompanyBin());
    var checkUser = userRepository.findUserByEmail(departmentCreateDto.getCompanyManager().getEmail());

    if (checkDepartment.isEmpty()) {
      if (checkUser.isPresent()) {
        return AuthenticationResponse
                .builder()
                .token("WARN_USER_EXISTS")
                .build();
      }

      UserRegistrationDto officeManager = departmentCreateDto.getCompanyManager();
      var user = User.builder()
              .firstName(officeManager.getFirstName())
              .lastName(officeManager.getLastName())
              .phoneNumber(officeManager.getPhoneNumber())
              .country(departmentCreateDto.getCompanyCountry())
              .city(departmentCreateDto.getCompanyCity())
              .email(officeManager.getEmail())
              .password(passwordEncoder.encode(officeManager.getPassword()))
              .role(Role.OFFICE_MANAGER)
              .build();

      String officeManagerID = userRepository.save(user).getId();

      Department department = Department.builder()
              .address(departmentCreateDto.getCompanyAddress())
              .departmentName(departmentCreateDto.getCompanyName())
              .bin(departmentCreateDto.getCompanyBin())
              .city(departmentCreateDto.getCompanyCity())
              .country(departmentCreateDto.getCompanyCountry())
              .managerIIN(departmentCreateDto.getCompanyManagerIIN())
              .managerID(officeManagerID)
              .build();

      departmentRepository.save(department);

      var jwtToken = jwtService.generateToken(Map.of(
              "companyName", department.getDepartmentName(),
              "companyBin", department.getBin(),
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
              .token("WARN_COMPANY_EXISTS")
              .build();
    }
  }
}
