package com.hostel.hostel_management_system.service;

import com.hostel.hostel_management_system.model.StudentLogin;
import com.hostel.hostel_management_system.repository.StudentLoginRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentLoginService {

    private final StudentLoginRepository repository;

    public StudentLoginService(StudentLoginRepository repository) {
        this.repository = repository;
    }

    public StudentLogin save(StudentLogin student) {
        return repository.save(student);
    }

    public List<StudentLogin> getAllStudents() {
        return repository.findAll();
    }

    public StudentLogin getStudentById(int id) {
        return repository.findById(id).orElse(null);
    }

    // **New Method for Login Validation**
    public boolean validateLogin(int id, String password) {
        return repository.findByIdAndPassword(id, password) != null;
    }
}