package org.talos.springtest2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.talos.springtest2.dto.UserLoginDto;
import org.talos.springtest2.dto.UserRegistrationDto;
import org.talos.springtest2.responses.LoginMessage;
import org.talos.springtest2.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
    private UserService userService;
    @Autowired
    public UserController(UserService userService)
    {
        this.userService = userService;
    }

    @PostMapping("/registration")
    public String registration(@RequestBody UserRegistrationDto userRegistrationDto)
    {
        System.out.println(userRegistrationDto);
        String id = userService.registrateUser(userRegistrationDto);
        return id;



    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDto userLoginDto)
    {
        LoginMessage loginResponse = userService.loginUser(userLoginDto);

        return ResponseEntity.ok(loginResponse);
    }
}
