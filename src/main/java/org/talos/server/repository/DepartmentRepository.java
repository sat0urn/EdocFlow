package org.talos.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.talos.server.entity.Department;

@Repository
public interface DepartmentRepository extends MongoRepository<Department,String> {
}
