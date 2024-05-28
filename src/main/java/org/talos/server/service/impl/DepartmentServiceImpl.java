package org.talos.server.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.talos.server.dto.DepartmentCreateDto;
import org.talos.server.entity.Department;
import org.talos.server.repository.DepartmentRepository;
import org.talos.server.service.DepartmentService;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {
    private final DepartmentRepository departmentRepository;

    @Override
    public String createDepartment(DepartmentCreateDto departmentCreateDto) {
        Department department = Department.builder()
                .address(departmentCreateDto.getAddress())
                .departmentName(departmentCreateDto.getDepartmentName())
                .bin(departmentCreateDto.getBin())
                .city(departmentCreateDto.getCity())
                .country(departmentCreateDto.getCountry())
                .managerIIN(departmentCreateDto.getManagerIIN())
                .build();
        departmentRepository.save(department);
        return department.getId();
    }
}
