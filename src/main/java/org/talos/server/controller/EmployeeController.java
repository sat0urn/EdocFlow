package org.talos.server.controller;

import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.talos.server.config.JwtService;
import org.talos.server.dto.employee_dto.EmployeeRegistrationDto;
import org.talos.server.dto.users_dto.SelectUsersToSignDto;
import org.talos.server.entity.Role;
import org.talos.server.entity.User;
import org.talos.server.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
public class EmployeeController {

  private final UserService userService;
  private final JwtService jwtService;

  @PostMapping("/registration")
  public ResponseEntity<String> registration(
          @RequestHeader("Authorization") String authHeader,
          @RequestBody EmployeeRegistrationDto employeeRegistrationDto
  ) {
    String response = userService.registrateEmployee(employeeRegistrationDto, authHeader);
    if (response.startsWith("WARN")) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    } else {
      return ResponseEntity.ok(response);
    }
  }

  @GetMapping("/getAll")
  private List<SelectUsersToSignDto> getAllEmployeesOnDepartment(
          @RequestHeader("Authorization") String authHeader
  ) throws IllegalAccessException {
    String managerEmail = jwtService.extractUsername(authHeader.substring(7));
    return userService.getAllEmployeeByDepartment(managerEmail);
  }

  @PatchMapping("/update")
  private ResponseEntity<?> updateEmployee(
          @RequestHeader("Authorization") String authHeader,
          @RequestBody SelectUsersToSignDto employee
  ) {
    String managerEmail = jwtService.extractUsername(authHeader.substring(7));
    Optional<User> optionalManager = userService.getUserByEmail(managerEmail);
    if (optionalManager.isEmpty() || !optionalManager.get().getRole().equals(Role.OFFICE_MANAGER))
      return new ResponseEntity<>("You dont have access to change employee parameters", HttpStatus.BAD_REQUEST);

    if (employee.getEmail() == null)
      return new ResponseEntity<>("Missing required parameter: email", HttpStatus.BAD_REQUEST);

    Optional<User> userOptional = userService.getUserByEmail(employee.getEmail());
    if (userOptional.isEmpty())
      return new ResponseEntity<>("User by email " + employee.getEmail() + ",doesnt exist in the system",
              HttpStatus.BAD_REQUEST);

    userService.updateEmployee(employee);

    return ResponseEntity.ok("User parameters by email " + employee.getEmail() + ", updated successfully");
  }
}
