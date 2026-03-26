package com.hostel.hostel_management_system.controller;

import com.hostel.hostel_management_system.model.StudentSpecialMenu;
import com.hostel.hostel_management_system.service.StudentSpecialMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/special-menu")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentSpecialMenuController {

    @Autowired
    private StudentSpecialMenuService service;

    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> getSpecialMenuForStudent(@PathVariable Long studentId) {
        List<StudentSpecialMenu> selected = service.getByStudentId(studentId);
        if (selected.isEmpty()) {
            return ResponseEntity.ok("No special menu selected by this student.");
        }
        return ResponseEntity.ok(selected);
    }

    @GetMapping("/all")
    public ResponseEntity<List<StudentSpecialMenu>> getAllSpecialMenuSelected() {
        return ResponseEntity.ok(service.getAllWithSpecialMenuSelected());
    }

    @PostMapping("/student/select")
    public ResponseEntity<String> selectSpecialMenu(@RequestBody StudentSpecialMenu specialMenu) {
        StudentSpecialMenu saved = service.saveSelection(specialMenu);
        return ResponseEntity.ok("Special menu selected successfully for student ID: " + saved.getStudentId());
    }
}
