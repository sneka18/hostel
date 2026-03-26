package com.hostel.hostel_management_system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;  // Correct import for Spring's Model
import com.hostel.hostel_management_system.repository.StudentLoginRepository;
import com.hostel.hostel_management_system.model.StudentLogin;

@Controller
@CrossOrigin(origins = "http://localhost:5173") 
public class PasswordController {

    @Autowired
    private StudentLoginRepository studentLoginRepository;
    // Show the password form
    @GetMapping("/set-password/{studentId}")
    public String showPasswordForm(@PathVariable Long studentId, Model model) {
        model.addAttribute("studentId", studentId);  // Correct use of addAttribute with Model
        return "set_password";  // HTML file name to be shown (e.g., set_password.html)
    }

    // Save the password when submitted
    @PostMapping("/set-password")
    public String savePassword(@RequestParam Long studentId, @RequestParam String password) {
        StudentLogin login = new StudentLogin();
        login.setId(studentId.intValue());  // Convert Long to int (depending on your StudentLogin model type)
        login.setPassword(password);  // Store the password (consider hashing the password for security)
        studentLoginRepository.save(login);  // Save to the database
        return "password_success";  // Redirect to a success page
    }
}
