package org.talos.server.service;

import org.talos.server.dto.employee_dto.EmployeeRegistrationDto;
import org.talos.server.dto.users_dto.SelectUsersToSignDto;
import org.talos.server.dto.users_dto.UserLoginDto;
import org.talos.server.dto.users_dto.UserRegistrationDto;
import org.talos.server.entity.Department;
import org.talos.server.entity.User;
import org.talos.server.responses.AuthenticationResponse;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public AuthenticationResponse registrateUser(UserRegistrationDto userRegistrationDto);

    public AuthenticationResponse loginUser(UserLoginDto loginDTO);

    public AuthenticationResponse isTokenExpired(String authHeader);

    public Optional<User> getUserByEmail(String email);

    List<String> getAllUsersEmails(String email);

    public void updateUser(User existingUser);

    void saveUsersPdf(String documentId, String userEmail);

    AuthenticationResponse registrateEmployee(EmployeeRegistrationDto employeeRegistrationDto);

    List<SelectUsersToSignDto> getAllEmployeeByManagerEmail(String receiverEmail) throws IllegalAccessException;
}
