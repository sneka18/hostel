package com.hostel.hostel_management_system.repository;
import com.hostel.hostel_management_system.model.Leave;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LeaveRepository extends JpaRepository<Leave, Long> {

    List<Leave> findByStatus(String status);

    List<Leave> findByStudentId(Long studentId);

    List<Leave> findByStudentIdAndStatus(Long studentId, String status);

}