package org.talos.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.talos.server.entity.AdminNotifications;

@Repository
public interface AdminRepository extends MongoRepository<AdminNotifications,String> {
}
