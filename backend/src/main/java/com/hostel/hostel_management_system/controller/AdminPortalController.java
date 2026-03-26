package com.hostel.hostel_management_system.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hostel.hostel_management_system.service.AdminPortalService;
@RestController
@RequestMapping("/adminportal")
@CrossOrigin
public class AdminPortalController {

    @Autowired
    private AdminPortalService adminService;

    @PostMapping("/verify/{id}")
    public ResponseEntity<String> approveStudent(@PathVariable Long id) {
        boolean success = adminService.approveStudent(id.intValue());
        if (success) {
            return ResponseEntity.ok("Student approved successfully.");
        } else {
            return ResponseEntity.status(404).body("Student not found in pending list.");
        }
    }
    @PostMapping("/leave/{leaveId}/status")
    public ResponseEntity<String> processLeaveRequest(
            @PathVariable Long leaveId,
            @RequestParam String status
    ) {
        if (!status.equalsIgnoreCase("Approved") && !status.equalsIgnoreCase("Rejected")) {
            return ResponseEntity.badRequest().body("Invalid status. Use 'Approved' or 'Rejected'.");
        }

        boolean result = adminService.processLeaveRequest(leaveId, status);
        if (result) {
            return ResponseEntity.ok("Leave " + status.toLowerCase() + " successfully.");
        } else {
            return ResponseEntity.status(404).body("Leave request not found.");
        }
    }
}
