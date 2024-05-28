package org.talos.server.controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.talos.server.dto.DepartmentCreateDto;
import org.talos.server.service.DepartmentService;


@RestController
@RequiredArgsConstructor
@RequestMapping("/department")
public class DepartmentController {
    private final DepartmentService departmentService;

    @PostMapping("/create")
    public ResponseEntity<?> createDepartment(@RequestBody DepartmentCreateDto departmentCreateDto) {
        return ResponseEntity.ok(departmentService.createDepartment(departmentCreateDto));
    }

}
