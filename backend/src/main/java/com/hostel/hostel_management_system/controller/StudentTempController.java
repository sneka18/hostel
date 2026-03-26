package com.hostel.hostel_management_system.controller;

import com.hostel.hostel_management_system.service.StudentTempService;
import com.hostel.hostel_management_system.model.StudentTemp;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/studenttemp")
@CrossOrigin(origins = "http://localhost:5173")  
public class StudentTempController {

    private final StudentTempService service;

    // Constructor injection for the service
    public StudentTempController(StudentTempService service) {
        this.service = service;
    }

    // Get all students
    @GetMapping
    public List<StudentTemp> getAllStudents() {
        return service.getAllStudents();
    }

    // Add new student
    @PostMapping("/add")
    public StudentTemp createStudent(@RequestBody StudentTemp student) {
        return service.saveStudent(student);  // Save student and auto-generate ID
    }
}
