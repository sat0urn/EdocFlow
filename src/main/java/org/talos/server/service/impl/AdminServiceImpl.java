package org.talos.server.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.talos.server.dto.other.NotificationDto;
import org.talos.server.entity.AdminNotifications;
import org.talos.server.repository.AdminRepository;
import org.talos.server.service.AdminService;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final AdminRepository adminRepository;

    @Override
    public void saveNotification(NotificationDto notificationDto) {
        AdminNotifications adminNotification = AdminNotifications.builder()
                .question(notificationDto.getQuestion())
                .phoneNumber(notificationDto.getPhoneNumber())
                .senderEmail(notificationDto.getSenderEmail())
                .senderName(notificationDto.getSenderName()).build();
        adminRepository.save(adminNotification);
    }
}
