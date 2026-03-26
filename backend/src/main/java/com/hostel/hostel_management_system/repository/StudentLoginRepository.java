package com.hostel.hostel_management_system.repository;

import com.hostel.hostel_management_system.model.StudentLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentLoginRepository extends JpaRepository<StudentLogin, Integer> {
    StudentLogin findByIdAndPassword(int id, String password);
}