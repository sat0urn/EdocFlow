package org.talos.springtest2.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.talos.springtest2.dto.UserLoginDto;
import org.talos.springtest2.dto.UserRegistrationDto;

@RestController
@RequestMapping("/user")
public class UserController {

    @PostMapping("/registration")
    public ResponseEntity<String> registration(@RequestBody UserRegistrationDto userRegistrationDto)
    {
        System.out.println(userRegistrationDto);
        return ResponseEntity.ok("User registration completed successfully");

    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLoginDto userLoginDto)
    {
        System.out.println(userLoginDto);
        return ResponseEntity.ok("User connected successfully");
    }
}
