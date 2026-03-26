package com.hostel.hostel_management_system.service;

import com.hostel.hostel_management_system.model.StudentDetails;
import com.hostel.hostel_management_system.repository.StudentDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentDetailsService {

    @Autowired
    private StudentDetailsRepository studentDetailsRepository;

    public List<StudentDetails> getAllStudents() {
        return studentDetailsRepository.findAll();
    }

    public Optional<StudentDetails> getStudentById(long id) {
        return studentDetailsRepository.findById(id);
    }

    public StudentDetails getStudentByEmail(String email) {
        return studentDetailsRepository.findByEmail(email);
    }

    public StudentDetails addStudent(StudentDetails studentDetails) {
        Long maxId = studentDetailsRepository.findMaxId();
        int nextId = (maxId == null) ? 101 : (int)(maxId + 1); // Start from 101 if table is empty
        studentDetails.setId(nextId);
        return studentDetailsRepository.save(studentDetails);
    }

    public void deleteStudent(long id) {
        studentDetailsRepository.deleteById(id);
    }
}
