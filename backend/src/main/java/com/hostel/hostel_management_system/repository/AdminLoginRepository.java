package com.hostel.hostel_management_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hostel.hostel_management_system.model.AdminLogin;


public interface AdminLoginRepository extends JpaRepository<AdminLogin, String> {
    AdminLogin findByUseridAndPassword(String userid, String password);
}
