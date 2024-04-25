package org.talos.springtest2.converter;

import org.springframework.stereotype.Component;
import org.talos.springtest2.dto.UserRegistrationDto;
import org.talos.springtest2.entity.User;
@Component
public class Converter {

    public User convertUserDtoToUser(UserRegistrationDto userRegistrationDto)
    {
        User user = new User();
        user.setCity(userRegistrationDto.getCity());
        user.setCountry(userRegistrationDto.getCountry());
        user.setEmail(userRegistrationDto.getEmail());
        user.setName(userRegistrationDto.getName());
        user.setPassword(userRegistrationDto.getPassword());
        user.setPhoneNumber(userRegistrationDto.getPhoneNumber());
        user.setSurName(userRegistrationDto.getSurName());
        return user;
    }
}
