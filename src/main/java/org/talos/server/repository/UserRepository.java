package org.talos.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.talos.server.entity.User;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
    User findUserByEmail(String email);
    Optional<User> findDistinctByEmailAndPassword(String email, String encodedPassword);
}
