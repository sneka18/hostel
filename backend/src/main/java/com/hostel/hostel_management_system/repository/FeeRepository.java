package com.hostel.hostel_management_system.repository;

import com.hostel.hostel_management_system.model.FeeDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeeRepository extends JpaRepository<FeeDetails, Long> {
}
