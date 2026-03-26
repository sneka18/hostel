package com.hostel.hostel_management_system.repository;

import com.hostel.hostel_management_system.model.StudentTemp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//import org.springframework.data.jpa.repository.Query;
@Repository
public interface StudentTempRepository extends JpaRepository<StudentTemp, Integer> {
	
}
