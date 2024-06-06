package org.talos.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import org.talos.server.entity.Department;
import org.talos.server.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
  Optional<User> findUserByEmail(String email);

  Optional<User> findUserByEmailOrIin(String email, String iin);

  List<User> findAllByOrganizationBin(String organisationBin);

  @Query(value = "{}", fields = "{'email': 1, 'role':  1}")
  List<User> findAllEmailAndRoles();

  @Query("{ 'email' : { $in: ?0 } }")
  List<User> findByEmails(List<String> emails);
}
