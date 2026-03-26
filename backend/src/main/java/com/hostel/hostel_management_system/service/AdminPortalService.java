package com.hostel.hostel_management_system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

import com.hostel.hostel_management_system.repository.*;
import com.hostel.hostel_management_system.model.*;

@Service
public class AdminPortalService {

    @Autowired
    private StudentTempRepository studentTempRepository;

    @Autowired
    private StudentDetailsRepository studentDetailsRepository;
    
    @Autowired
    private LeaveRepository leaveRepository;


    @Autowired
    private EmailService emailService;

    public boolean approveStudent(Integer tempId) {
        Optional<StudentTemp> optionalTemp = studentTempRepository.findById(tempId);

        if (optionalTemp.isPresent()) {
            StudentTemp temp = optionalTemp.get();

            StudentDetails approvedStudent = new StudentDetails();
            approvedStudent.setId(temp.getId());
            approvedStudent.setName(temp.getName());
            approvedStudent.setEmail(temp.getEmail());
            approvedStudent.setDept(temp.getDept());
            approvedStudent.setRoomno(temp.getRoomno());
            approvedStudent.setAge(temp.getAge());
            approvedStudent.setPhone(temp.getPhone());
            approvedStudent.setSem(temp.getSem());
            approvedStudent.setBlock(temp.getBlock());

            approvedStudent = studentDetailsRepository.save(approvedStudent);

            // Send Email with Set Password Link
            String link = "http://localhost:5173/set-password";
            emailService.sendApprovalEmail(temp.getEmail(), temp.getName(), link,temp.getId());

            studentTempRepository.deleteById(tempId);
            return true;
        }
        return false;
    }
    public boolean processLeaveRequest(Long leaveId, String status) {
        Optional<Leave> optionalLeave = leaveRepository.findById(leaveId);

        if (optionalLeave.isPresent()) {
            Leave leave = optionalLeave.get();
            leave.setStatus(status);
            leaveRepository.save(leave);

            // Get student details
            Long studentId = leave.getStudentId();
            Optional<StudentDetails> optionalStudent = studentDetailsRepository.findById(studentId);

            if (optionalStudent.isPresent()) {
                StudentDetails student = optionalStudent.get();
                String subject = "Leave Request " + status;
                String body = "Hello " + student.getName() + ",\n\nYour leave request (ID: " + leaveId +
                              ") has been " + status.toLowerCase() + ".\n\nRegards,\nHostel Admin";
                emailService.sendEmail(student.getEmail(), subject, body);
            }

            return true;
        }

        return false;
    }
}
