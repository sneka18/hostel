package com.hostel.hostel_management_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hostel.hostel_management_system.service.AdminLoginService;
import com.hostel.hostel_management_system.model.AdminLogin;
//import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173") 
public class AdminLoginController {
    @Autowired
    private AdminLoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AdminLogin login) {
        boolean isValid = loginService.validateAdmin(login.getUserid(), login.getPassword());
        return isValid ? ResponseEntity.ok("Login Successful!") : ResponseEntity.status(401).body("Invalid ID or Password!");
    }
}