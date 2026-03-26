package com.hostel.hostel_management_system.service;

import com.hostel.hostel_management_system.model.Leave;
import com.hostel.hostel_management_system.model.StudentDetails;
import com.hostel.hostel_management_system.repository.LeaveRepository;
import com.hostel.hostel_management_system.repository.StudentDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveService {

    private final LeaveRepository repository;

    @Autowired
    private StudentDetailsRepository studentDetailsRepository;

    @Autowired
    private EmailService emailService;

    public LeaveService(LeaveRepository repository) {
        this.repository = repository;
    }

    public List<Leave> getPendingLeaves() {
        return repository.findByStatus("Pending");
    }

    public List<Leave> getApprovedLeavesByStudent(Long studentId) {
        return repository.findByStudentIdAndStatus(studentId, "Approved");
    }

    public List<Leave> getPendingLeavesByStudent(Long studentId) {
        return repository.findByStudentIdAndStatus(studentId, "Pending");
    }

    public Leave applyLeave(Leave leave) {
        leave.setStatus("Pending");
        return repository.save(leave);
    }

    public Leave updateStatus(Long leaveId, String status) {
        Leave leave = repository.findById(leaveId).orElseThrow();
        leave.setStatus(status);
        Leave updatedLeave = repository.save(leave);

        // Fetch student details
        Long studentId = leave.getStudentId();
        StudentDetails student = studentDetailsRepository.findById(studentId)
                .orElse(null);

        // Send email if student and email exist
        if (student != null && student.getEmail() != null) {
            String subject = "Leave Request " + (status.equalsIgnoreCase("Approved") ? "Approved" : "Rejected");
            String message = "Hi " + student.getName() + ",\n\nYour leave request for " +
                    leave.getFromDate() + " to "+ leave.getToDate() + " has been " + status.toLowerCase() + ".";

            emailService.sendEmail(student.getEmail(), subject, message);
        }

        return updatedLeave;
    }
}
