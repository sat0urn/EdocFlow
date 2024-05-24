package org.talos.server.service;

import org.talos.server.dto.SelectUsersToSignDto;
import org.talos.server.dto.UserLoginDto;
import org.talos.server.dto.UserRegistrationDto;
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
    public Department getDepartmentByUserId(String id);
    public List<SelectUsersToSignDto> getAllUsersByDepartment(Department department);
    public void updateUser(User existingUser);
}
