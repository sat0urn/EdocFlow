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

import java.util.Optional;

@Service
public class UserService {
    private UserRepository userRepository;
    private Converter converter;
    private PasswordEncoder passwordEncoder;
    @Autowired
    UserService(UserRepository userRepository,Converter converter,PasswordEncoder passwordEncoder)
    {

        this.userRepository = userRepository;
        this.converter = converter;
        this.passwordEncoder = passwordEncoder;
    }

    public String registrateUser(UserRegistrationDto userRegistrationDto) {
        userRegistrationDto.setPassword(passwordEncoder.encode(userRegistrationDto.getPassword()));
        User user = converter.convertUserDtoToUser(userRegistrationDto);
        userRepository.save(user);
        return user.getId();
    }
    public LoginMessage loginUser(UserLoginDto loginDTO) {
        User employee1 = userRepository.findUserByEmail(loginDTO.getEmail());
        if (employee1 != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = employee1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                Optional<User> user = userRepository.findDistinctByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
                if (user.isPresent()) {
                    return new LoginMessage("Login Success", true);
                } else {
                    return new LoginMessage("Login Failed", false);
                }
            } else {
                return new LoginMessage("password Not Match", false);
            }
        }else {
            return new LoginMessage("Email not exits", false);
        }
    }
}
