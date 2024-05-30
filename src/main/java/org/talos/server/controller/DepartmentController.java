package org.talos.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.talos.server.dto.DepartmentCreateDto;
import org.talos.server.service.DepartmentService;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/department")
public class DepartmentController {
    private final DepartmentService departmentService;

    @PostMapping("/create")
    public ResponseEntity<?> createDepartment(@RequestBody DepartmentCreateDto departmentCreateDto) {
        return ResponseEntity.ok(departmentService.createDepartment(departmentCreateDto));
    }

}
