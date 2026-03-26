package com.hostel.hostel_management_system.controller;
import com.hostel.hostel_management_system.service.FeeService;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.hostel.hostel_management_system.model.*;
import com.hostel.hostel_management_system.repository.*;

@RestController
@RequestMapping("/api/fees")
@CrossOrigin(origins = "http://localhost:5173") 
public class FeeController {

    @Autowired
    private FeeService feeService;
    @Autowired
    private StudentDetailsRepository studentRepository;
    @Autowired
    private RoomRepository roomRepository;
    
    @Autowired
    private FeeRepository feeRepository;
    
    @GetMapping("/{studentId}")
    public FeeDetails getFeeDetails(@PathVariable Long studentId) {
        FeeDetails fee = feeService.getFeeDetails(studentId);
        if (fee == null) {
            return feeService.calculateFee(studentId);
        }
        return fee;
    }
    @PostMapping("/assign-all")
    public String assignFeesToAllStudents() {
        List<StudentDetails> allStudents = studentRepository.findAll();
        LocalDate dueDate = LocalDate.now().plusDays(1);

        for (StudentDetails student : allStudents) {
            Long studentId = student.getId();
            
            Room room = roomRepository.findAll().stream()
            	    .filter(r -> Arrays.stream(r.getStudentId().split(","))
            	        .anyMatch(id -> id.trim().equals(String.valueOf(studentId))))
            	    .findFirst()
            	    .orElse(null);



            if (room == null) continue;

            double roomFee;
            switch (room.getRoomType().toLowerCase()) {
                case "1share":
                    roomFee = 30000;
                    break;
                case "2share":
                    roomFee = 20000;
                    break;
                case "3share":
                    roomFee = 10000;
                    break;
                default:
                    roomFee = 0;
            }

            FeeDetails fee = new FeeDetails();
            fee.setStudentId(studentId);
            fee.setRoomFee(roomFee);
            fee.setMessFee(3000);
            fee.setSpecialFoodFee(0);
            fee.setFine(0);
            fee.setDueDate(dueDate);
            fee.setTotalFee(roomFee + 3000);

            feeRepository.save(fee);
        }

        return "Fees assigned to all students successfully.";
    }

}
