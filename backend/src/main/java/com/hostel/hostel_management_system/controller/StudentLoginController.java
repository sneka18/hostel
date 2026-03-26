package com.hostel.hostel_management_system.controller;

import com.hostel.hostel_management_system.model.StudentLogin;
import com.hostel.hostel_management_system.service.StudentLoginService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import java.util.List;
@CrossOrigin(origins = "http://localhost:5173") 
@RestController
@RequestMapping("/students")
public class StudentLoginController {

    private final StudentLoginService service;
    public StudentLoginController(StudentLoginService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public StudentLogin addStudent(@RequestBody StudentLogin student) {
        return service.save(student);
    }

    @GetMapping("/all")
    public List<StudentLogin> getAllStudents() {
        return service.getAllStudents();
    }

    @GetMapping("/{id}")
    public StudentLogin getStudent(@PathVariable int id) {
        return service.getStudentById(id);
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam int id, @RequestParam String password) {
        boolean isValid = service.validateLogin(id, password);
        return isValid ? ResponseEntity.ok("Login Successful!") : ResponseEntity.status(401).body("Invalid ID or Password!");
    }
}
