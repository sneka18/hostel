package com.hostel.hostel_management_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hostel.hostel_management_system.model.StudentSpecialMenu;

public interface StudentSpecialMenuRepository extends JpaRepository<StudentSpecialMenu, Long> {
    List<StudentSpecialMenu> findByStudentId(Long studentId);
}
