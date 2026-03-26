package com.hostel.hostel_management_system.controller;

import com.hostel.hostel_management_system.model.StudentDetails;
import com.hostel.hostel_management_system.service.StudentDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173") 
@RestController
@RequestMapping("/api/studentdetails")
public class StudentDetailsController {

    @Autowired
    private StudentDetailsService studentDetailsService;

    @GetMapping
    public List<StudentDetails> getAllStudents() {
        return studentDetailsService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Optional<StudentDetails> getStudentById(@PathVariable int id) {
        return studentDetailsService.getStudentById(id);
    }

    @GetMapping("/email/{email}")
    public StudentDetails getStudentByEmail(@PathVariable String email) {
        return studentDetailsService.getStudentByEmail(email);
    }

    @PostMapping("/add")
    public StudentDetails addStudent(@RequestBody StudentDetails studentDetails) {
        return studentDetailsService.addStudent(studentDetails);
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable int id) {
        studentDetailsService.deleteStudent(id);
        return "Student with ID " + id + " deleted";
    }
}
