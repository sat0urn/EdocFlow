package org.talos.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.talos.server.entity.Inbox;
import org.talos.server.entity.User;

import java.util.List;

public interface InboxRepository extends MongoRepository<Inbox,String> {
    List<Inbox> findAllByReceiver(User userReceiver);
}
