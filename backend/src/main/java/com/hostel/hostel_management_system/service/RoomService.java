package com.hostel.hostel_management_system.service;

import com.hostel.hostel_management_system.model.Room;
import com.hostel.hostel_management_system.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List<Room> getRoomsByBlock(String block) {
        return roomRepository.findByBlock(block);
    }

    public List<Room> getRoomsByType(String type) {
        return roomRepository.findByRoomType(type);
    }

    public Room getRoomByStudentId(String studentId) {
        List<Room> allRooms = roomRepository.findAll();
        for (Room room : allRooms) {
            long[] ids = room.getStudentIdsArray();
            for (long id : ids) {
                if (String.valueOf(id).equals(studentId)) {
                    return room;
                }
            }
        }
        return null;
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }

    public Room getRoomById(Long id) {
        return roomRepository.findById(id).orElse(null);
    }
}
