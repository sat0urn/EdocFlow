package org.talos.server.controller;

import io.jsonwebtoken.Claims;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.talos.server.config.JwtService;
import org.talos.server.dto.employee_dto.EmployeeRegistrationDto;
import org.talos.server.dto.users_dto.SelectUsersToSignDto;
import org.talos.server.dto.users_dto.UserRegistrationDto;
import org.talos.server.entity.Department;
import org.talos.server.entity.User;
import org.talos.server.responses.AuthenticationResponse;
import org.talos.server.service.DepartmentService;
import org.talos.server.service.UserService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/employee")
public class EmployeeController {
    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping("/registration")
    public ResponseEntity<AuthenticationResponse> registration(
            @RequestBody EmployeeRegistrationDto employeeRegistrationDto
    ) {
        AuthenticationResponse authenticationResponse = userService.registrateEmployee(employeeRegistrationDto);
        if (authenticationResponse.getToken().isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            return ResponseEntity.ok(authenticationResponse);
        }
    }

    @GetMapping("/getAll")
    private List<SelectUsersToSignDto> getAllUsersWorkingOnDepartment(
            @RequestHeader("Authorization") String authHeader
    ) throws IllegalAccessException {
        String managerEmail = jwtService.extractClaim(authHeader.substring(7), Claims::getSubject);
        return userService.getAllEmployeeByManagerEmail(managerEmail);
    }
}
