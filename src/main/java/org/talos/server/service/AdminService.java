package org.talos.server.service;

import org.talos.server.dto.other.NotificationDto;

public interface AdminService {
    void saveNotification(NotificationDto notificationDto);
}
