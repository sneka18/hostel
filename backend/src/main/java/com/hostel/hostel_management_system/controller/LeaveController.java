package com.hostel.hostel_management_system.controller;

import com.hostel.hostel_management_system.model.*;
import com.hostel.hostel_management_system.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leave")
@CrossOrigin(origins = "http://localhost:5173") 
public class LeaveController {

    private final LeaveService service;

    public LeaveController(LeaveService service) {
        this.service = service;
    }

    // GET http://localhost:8080/leave/pending
    @GetMapping("/pending")
    public List<Leave> getAllPendingLeaves() {
        return service.getPendingLeaves();
    }

    // GET http://localhost:8080/{studentId}
    @GetMapping("/{studentId}")
    public List<Leave> getAllLeavesByStudent(@PathVariable Long studentId) {
        return service.getApprovedLeavesByStudent(studentId);
    }

    // GET http://localhost:8080/{studentId}/pending
    @GetMapping("/{studentId}/pending")
    public List<Leave> getPendingLeavesByStudent(@PathVariable Long studentId) {
        return service.getPendingLeavesByStudent(studentId);
    }

    // POST http://localhost:8080/{studentId}/apply
    @PostMapping("/{studentId}/apply")
    public Leave applyLeave(@PathVariable Long studentId, @RequestBody Leave leave) {
        leave.setStudentId(studentId);
        return service.applyLeave(leave);
    }

    // PUT http://localhost:8080/leave/{leaveId}/status?status=Approved
    @PutMapping("/{leaveId}/status")
    public Leave updateLeaveStatus(@PathVariable Long leaveId, @RequestParam String status) {
        return service.updateStatus(leaveId, status);
    }
}
