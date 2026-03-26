package com.hostel.hostel_management_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class StudentDetails {
    @Id
    private long id;
    private String name;
    private int age;
    private String email;
    private String sem;
    private String dept;
    private String block;
    private String roomno;
    private String phone;
    public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
    public StudentDetails() {}
    public StudentDetails(String name, int age, String email, String sem, String dept, String block, String roomno) {
		super();
		this.name = name;
		this.age = age;
		this.email = email;
		this.sem = sem;
		this.dept = dept;
		this.block = block;
		this.roomno = roomno;
	}
	// Getters and Setters
    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSem() { return sem; }
    public void setSem(String sem) { this.sem = sem; }

    public String getDept() { return dept; }
    public void setDept(String dept) { this.dept = dept; }

    public String getBlock() { return block; }
    public void setBlock(String block) { this.block = block; }

    public String getRoomno() { return roomno; }
    public void setRoomno(String roomno) { this.roomno = roomno; }
}
