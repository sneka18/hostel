package com.hostel.hostel_management_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hostel.hostel_management_system.service.EmailService;

@RestController
public class EmailController {
	@Autowired
	private EmailService emailservice;
	
	@GetMapping("/send-email")
	public String sendEmail()
	{
		emailservice.sendEmail("2312047@gmail.com", "Approved", "Correct");
		return "Email sent success";
	}

}
