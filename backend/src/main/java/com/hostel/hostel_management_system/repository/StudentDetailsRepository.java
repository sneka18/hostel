
package com.hostel.hostel_management_system.repository;

import com.hostel.hostel_management_system.model.StudentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
public interface StudentDetailsRepository extends JpaRepository<StudentDetails, Long> {
    StudentDetails findByEmail(String email);
    @Query("SELECT MAX(s.id) FROM StudentDetails s")
    Long findMaxId();
}
