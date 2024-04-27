package org.talos.springtest2.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.talos.springtest2.converter.Converter;
import org.talos.springtest2.dto.UserLoginDto;
import org.talos.springtest2.dto.UserRegistrationDto;
import org.talos.springtest2.entity.User;
import org.talos.springtest2.repository.UserRepository;
import org.talos.springtest2.responses.LoginMessage;
import org.talos.springtest2.responses.RegistrationResponse;

import java.util.Optional;

@Service
public class UserService {
    private UserRepository userRepository;
    private Converter converter;
    private PasswordEncoder passwordEncoder;

    @Autowired
    UserService(UserRepository userRepository, Converter converter, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.converter = converter;
        this.passwordEncoder = passwordEncoder;
    }

    public RegistrationResponse registrateUser(UserRegistrationDto userRegistrationDto) {
        User checkUser = userRepository.findUserByEmail(userRegistrationDto.getEmail());
        if (checkUser == null) {
            userRegistrationDto.setPassword(passwordEncoder.encode(userRegistrationDto.getPassword()));
            User user = converter.convertUserDtoToUser(userRegistrationDto);
            userRepository.save(user);
            return new RegistrationResponse(user.getId(), true);
        } else {
            return new RegistrationResponse("User already exists with such Email", false);
        }
    }

    public LoginMessage loginUser(UserLoginDto loginDTO) {
        User user = userRepository.findUserByEmail(loginDTO.getEmail());
        System.out.println(user);
        if (user != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = user.getPassword();
            boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                Optional<User> userOptional = userRepository.findDistinctByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
                if (userOptional.isPresent()) {
                    return new LoginMessage("Login Success", true);
                } else {
                    return new LoginMessage("Login Failed", false);
                }
            } else {
                return new LoginMessage("password Not Match", false);
            }
        } else {
            return new LoginMessage("Email not exits", false);
        }
    }
}
