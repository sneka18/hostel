package com.hostel.hostel_management_system.service;

import com.hostel.hostel_management_system.model.FeeDetails;
import com.hostel.hostel_management_system.model.Room;
import com.hostel.hostel_management_system.model.StudentSpecialMenu;
import com.hostel.hostel_management_system.repository.FeeRepository;
import com.hostel.hostel_management_system.repository.RoomRepository;
import com.hostel.hostel_management_system.repository.StudentSpecialMenuRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;

@Service
public class FeeService {

    @Autowired
    private FeeRepository feeRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private StudentSpecialMenuRepository studentSpecialMenuRepository;

    public FeeDetails calculateFee(Long studentId) {
        Room room = roomRepository.findAll().stream()
                .filter(r -> Arrays.stream(r.getStudentIdsArray()).anyMatch(id -> id == studentId))
                .findFirst().orElse(null);

        if (room == null) return null;

        double roomFee = room.getFees();
        double messFee = 3000.0;
        double specialFoodFee = 0.0;

        // ✅ Add Special Menu Fee
        List<StudentSpecialMenu> specialMenus = studentSpecialMenuRepository.findByStudentId(studentId);
        for (StudentSpecialMenu s : specialMenus) {
            specialFoodFee += s.getFee();
        }

        // ✅ Fine Calculation (dynamic by days)
        LocalDate dueDate = LocalDate.of(2025, 5, 10);
        long daysLate = ChronoUnit.DAYS.between(dueDate, LocalDate.now());
        double fine = daysLate > 0 ? daysLate * 200.0 : 0.0;

        FeeDetails feeDetails = new FeeDetails(studentId, roomFee, messFee, specialFoodFee, fine, dueDate);
        return feeRepository.save(feeDetails);
    }

    public FeeDetails getFeeDetails(Long studentId) {
        return feeRepository.findById(studentId).orElse(null);
    }
}
