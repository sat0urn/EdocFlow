package org.talos.server.service;

import org.talos.server.dto.organisation_dto.DepartmentCreateDto;
import org.talos.server.responses.AuthenticationResponse;

public interface DepartmentService {
    AuthenticationResponse createDepartment(DepartmentCreateDto departmentCreateDto);
}
