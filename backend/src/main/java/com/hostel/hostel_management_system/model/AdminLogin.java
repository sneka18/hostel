package com.hostel.hostel_management_system.model;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;

@Entity
@Table(name = "admin_login")
public class AdminLogin {
    @Id
    @Column(name = "userid")
    private String userid;
    
    @Column(name = "password")
    private String password;

    // Getters and Setters
    public String getUserid() { return userid; }
    public void setUserid(String userid) { this.userid = userid; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
