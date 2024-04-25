package org.talos.springtest2.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.talos.springtest2.converter.Converter;
import org.talos.springtest2.dto.UserRegistrationDto;
import org.talos.springtest2.entity.User;
import org.talos.springtest2.repository.UserRepository;

@Service
public class UserService {
    private UserRepository userRepository;
    private Converter converter;
   // private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    UserService(UserRepository userRepository,Converter converter)
    {
        this.userRepository = userRepository;
        this.converter = converter;
    }

    public String registrateUser(UserRegistrationDto userRegistrationDto) {
        User user = converter.convertUserDtoToUser(userRegistrationDto);
        userRepository.save(user);
        return user.getId();
    }
}
