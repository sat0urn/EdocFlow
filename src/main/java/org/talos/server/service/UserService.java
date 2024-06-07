package org.talos.server.service;

import org.talos.server.dto.employee_dto.EmployeeRegistrationDto;
import org.talos.server.dto.users_dto.SelectUsersToSignDto;
import org.talos.server.dto.users_dto.UserLoginDto;
import org.talos.server.dto.users_dto.UserRegistrationDto;
import org.talos.server.entity.User;
import org.talos.server.responses.AuthenticationResponse;

import java.util.List;
import java.util.Optional;

public interface UserService {
    AuthenticationResponse registrateUser(UserRegistrationDto userRegistrationDto);

    AuthenticationResponse loginUser(UserLoginDto loginDTO);

    AuthenticationResponse isTokenExpired(String authHeader);

    Optional<User> getUserByEmail(String email);

    List<String> getIndependentUsersEmails(String email);

    void updateUser(User existingUser);

    void saveUsersPdf(String documentId, String userEmail);

    String registrateEmployee(EmployeeRegistrationDto employeeRegistrationDto, String authHeader);

    List<SelectUsersToSignDto> getAllEmployeeByDepartment(String receiverEmail) throws IllegalAccessException;

    void updateEmployee(SelectUsersToSignDto user);
}
