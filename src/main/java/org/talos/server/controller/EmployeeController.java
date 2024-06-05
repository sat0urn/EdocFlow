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
import org.talos.server.service.UserService;

import java.util.List;

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
}
