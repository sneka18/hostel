package com.hostel.hostel_management_system.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hostel.hostel_management_system.repository.AdminLoginRepository;
import com.hostel.hostel_management_system.model.AdminLogin;

@Service
public class AdminLoginService {
    @Autowired
    private AdminLoginRepository repository;

    public boolean validateAdmin(String userid, String password) {
        // Use the updated method name here
        AdminLogin admin = repository.findByUseridAndPassword(userid, password);
        return admin != null;
    }
}
