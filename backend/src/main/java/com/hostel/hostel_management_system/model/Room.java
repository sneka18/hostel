package com.hostel.hostel_management_system.model;

import jakarta.persistence.*;
import java.util.Arrays;
import java.util.stream.Collectors;

@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    private String block;
    private int roomNo;
    private String roomType;
    private double fees;

    @Column(name = "student_id")
    private String studentId; // Stored as comma-separated long values

    public Room() {}

    public Room(String block, int roomNo, String roomType, double fees, long[] studentIds) {
        this.block = block;
        this.roomNo = roomNo;
        this.roomType = roomType;
        this.fees = fees;
        setStudentIdsArray(studentIds);
    }

    // Getters and Setters

    public Long getRoomId() { return roomId; }

    public void setRoomId(Long roomId) { this.roomId = roomId; }

    public String getBlock() { return block; }

    public void setBlock(String block) { this.block = block; }

    public int getRoomNo() { return roomNo; }

    public void setRoomNo(int roomNo) { this.roomNo = roomNo; }

    public String getRoomType() { return roomType; }

    public void setRoomType(String roomType) { this.roomType = roomType; }

    public double getFees() { return fees; }

    public void setFees(double fees) { this.fees = fees; }

    public long[] getStudentIdsArray() {
        if (studentId == null || studentId.isEmpty()) return new long[0];
        return Arrays.stream(studentId.split(","))
                     .mapToLong(Long::parseLong)
                     .toArray();
    }

    public void setStudentIdsArray(long[] studentIds) {
        this.studentId = Arrays.stream(studentIds)
                               .mapToObj(String::valueOf)
                               .collect(Collectors.joining(","));
    }

    public String getStudentId() { return studentId; }

    public void setStudentId(String studentId) { this.studentId = studentId; }

    @Override
    public String toString() {
        return "Room{" +
                "roomId=" + roomId +
                ", block='" + block + '\'' +
                ", roomNo=" + roomNo +
                ", roomType='" + roomType + '\'' +
                ", fees=" + fees +
                ", studentId=" + studentId +
                '}';
    }
}
