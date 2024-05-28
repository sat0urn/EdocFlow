package org.talos.server.service;

import org.talos.server.dto.DepartmentCreateDto;

public interface DepartmentService {
    String createDepartment(DepartmentCreateDto departmentCreateDto);
}
