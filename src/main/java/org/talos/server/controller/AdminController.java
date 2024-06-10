package org.talos.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.talos.server.dto.other.NotificationDto;
import org.talos.server.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @PostMapping("/set")
    private ResponseEntity<?> setAdminNotifications(@RequestBody NotificationDto notificationDto)
    {
        if(notificationDto == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You should fill all information");
        adminService.saveNotification(notificationDto);
        return ResponseEntity.ok("Notification sent successfully" + "\n" + "Please wait for the reply to your email");
    }

}
