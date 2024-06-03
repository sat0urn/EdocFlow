package org.talos.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.talos.server.entity.Department;

import java.util.Optional;

@Repository
public interface DepartmentRepository extends MongoRepository<Department,String> {
  Optional<Department> findDepartmentByBin(String bin);
  Optional<Department> findDepartmentByManagerID(String managerId);
}
