package com.hostel.hostel_management_system.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class FeeDetails {

    @Id
    private Long studentId;  // Same as student ID

    private double roomFee;
    private double messFee;
    private double specialFoodFee;
    private double fine;
    private double totalFee;
    private LocalDate dueDate;
    
    public FeeDetails(Long studentId, double roomFee, double messFee, double specialFoodFee, double fine, LocalDate dueDate) {
        this.studentId = studentId;
        this.roomFee = roomFee;
        this.messFee = messFee;
        this.specialFoodFee = specialFoodFee;
        this.fine = fine;
        this.dueDate = dueDate;
        this.totalFee = roomFee + messFee + specialFoodFee + fine;
    }


    public FeeDetails() {}

    
    // Getters and Setters

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public double getRoomFee() {
        return roomFee;
    }

    public void setRoomFee(double roomFee) {
        this.roomFee = roomFee;
    }

    public double getMessFee() {
        return messFee;
    }

    public void setMessFee(double messFee) {
        this.messFee = messFee;
    }

    public double getSpecialFoodFee() {
        return specialFoodFee;
    }

    public void setSpecialFoodFee(double specialFoodFee) {
        this.specialFoodFee = specialFoodFee;
    }

    public double getFine() {
        return fine;
    }

    public void setFine(double fine) {
        this.fine = fine;
    }

    public double getTotalFee() {
        return roomFee + messFee + specialFoodFee + fine;
    }

    public void setTotalFee(double totalFee) {
		this.totalFee = totalFee;
	}


	public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }
}
