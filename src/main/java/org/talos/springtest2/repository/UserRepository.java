package org.talos.springtest2.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.talos.springtest2.entity.User;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
}
