package com.hostel.hostel_management_system.service;

import com.hostel.hostel_management_system.model.StudentTemp;
import com.hostel.hostel_management_system.repository.StudentTempRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentTempService {

    @Autowired
    private StudentTempRepository studentTempRepository;

    // Get all students from the student_temp table
    public List<StudentTemp> getAllStudents() {
        return studentTempRepository.findAll();
    }

    // Save a new student record
    public StudentTemp saveStudent(StudentTemp studentTemp) {
        return studentTempRepository.save(studentTemp);  // Save will auto-generate the ID
    }
}
