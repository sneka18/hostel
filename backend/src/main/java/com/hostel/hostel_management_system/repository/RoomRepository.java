package com.hostel.hostel_management_system.repository;

import com.hostel.hostel_management_system.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByBlock(String block);
    List<Room> findByRoomType(String roomType);
}
