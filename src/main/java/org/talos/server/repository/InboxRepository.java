package org.talos.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import org.talos.server.entity.Inbox;

import java.util.List;

@Repository
public interface InboxRepository extends MongoRepository<Inbox, String> {
  List<Inbox> findAllBySenderId(String senderId);

  @Query("{ 'receivers.userEmail' : ?0 }")
  List<Inbox> findAllByReceiverEmail(String receiverEmail);
}
