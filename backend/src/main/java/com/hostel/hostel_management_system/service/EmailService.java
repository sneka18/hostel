package com.hostel.hostel_management_system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendApprovalEmail(String toEmail, String name, String link,int id) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Student Registration Approved");
        message.setText("Hello " + name + ",\n\nYour hostel registration has been approved.\nClick the following link to set your password and use USER ID as "+id+"and the Link is : " + link);
        try {
            mailSender.send(message);
        } catch (MailException e) {
            e.printStackTrace(); // Handle exception (log it, rethrow, etc.)
        }
    }
    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("esdurgadevi1@gmail.com"); // Must match your config
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
