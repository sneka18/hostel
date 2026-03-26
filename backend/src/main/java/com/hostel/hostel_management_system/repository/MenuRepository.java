package com.hostel.hostel_management_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hostel.hostel_management_system.model.Menu;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    Menu findByDay(String day);
}

