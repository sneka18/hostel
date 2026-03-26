package com.hostel.hostel_management_system.controller;

import com.hostel.hostel_management_system.model.Room;
import com.hostel.hostel_management_system.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:5173") 
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/add")
    public Room addRoom(@RequestBody Room room) {
        return roomService.saveRoom(room);
    }

    @GetMapping("/block/{block}")
    public List<Room> getRoomsByBlock(@PathVariable String block) {
        return roomService.getRoomsByBlock(block);
    }

    @GetMapping("/type/{type}")
    public List<Room> getRoomsByType(@PathVariable String type) {
        return roomService.getRoomsByType(type);
    }

    @GetMapping("/student/{studentId}")
    public String getRoomByStudent(@PathVariable String studentId) {
        Room room = roomService.getRoomByStudentId(studentId);
        if (room == null) {
            return "Student not found in any room";
        }
        return "Block: " + room.getBlock() +
                ", Room No: " + room.getRoomNo() +
                ", Room Type: " + room.getRoomType();
    }

    @GetMapping("/all")
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/{id}")
    public Room getRoomById(@PathVariable Long id) {
        return roomService.getRoomById(id);
    }

    @PutMapping("/update/{id}")
    public Room updateRoom(@PathVariable Long id, @RequestBody Room updatedRoom) {
        Room room = roomService.getRoomById(id);
        if (room != null) {
            room.setBlock(updatedRoom.getBlock());
            room.setRoomNo(updatedRoom.getRoomNo());
            room.setRoomType(updatedRoom.getRoomType());
            room.setFees(updatedRoom.getFees());
            room.setStudentId(updatedRoom.getStudentId());
            return roomService.saveRoom(room);
        }
        return null;
    }

    @DeleteMapping("/delete/{id}")
    public String deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return "Room deleted successfully.";
    }
}
