package com.hostel.hostel_management_system.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "menu")
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id")
    private Long menu_id;
    
    @Column(name = "day_name", nullable = false)
    private String day;
    
    @Column(name = "breakfast", nullable = false)
    private String breakfast;
    
    @Column(name = "lunch", nullable = false)
    private String lunch;
    
    @Column(name = "snacks", nullable = false)
    private String snacks;
    
    @Column(name = "dinner", nullable = false)
    private String dinner;
    
    @Column(name = "daily_rate", nullable = false)
    private double dailyRate;
    private String specialMenu1;
    private String specialMenu2;
    @Column(name="special1Fee")
    private double special1Fee;
    @Column(name="special2Fee")
    private double special2Fee;

    
    public Long getMenu_id() {
		return menu_id;
	}

	public void setMenu_id(Long menu_id) {
		this.menu_id = menu_id;
	}

	public String getSpecialMenu1() {
		return specialMenu1;
	}

	public void setSpecialMenu1(String specialMenu1) {
		this.specialMenu1 = specialMenu1;
	}

	public String getSpecialMenu2() {
		return specialMenu2;
	}

	public void setSpecialMenu2(String specialMenu2) {
		this.specialMenu2 = specialMenu2;
	}

	public double getSpecial1Fee() {
		return special1Fee;
	}

	public void setSpecial1Fee(double special1Fee) {
		this.special1Fee = special1Fee;
	}

	public double getSpecial2Fee() {
		return special2Fee;
	}

	public void setSpecial2Fee(double special2Fee) {
		this.special2Fee = special2Fee;
	}

	// Constructors, getters, and setters
    public Menu() {}
    
    public Menu(String day, String breakfast, String lunch, String snacks, String dinner, double dailyRate) {
        this.day = day;
        this.breakfast = breakfast;
        this.lunch = lunch;
        this.snacks = snacks;
        this.dinner = dinner;
        this.dailyRate = dailyRate;
    }
    
    // Getters and Setters
    public Long getId() { return menu_id; }
    public void setId(Long id) { this.menu_id = id; }
    public String getDay() { return day; }
    public void setDay(String day) { this.day = day; }
    public String getBreakfast() { return breakfast; }
    public void setBreakfast(String breakfast) { this.breakfast = breakfast; }
    public String getLunch() { return lunch; }
    public void setLunch(String lunch) { this.lunch = lunch; }
    public String getSnacks() { return snacks; }
    public void setSnacks(String snacks) { this.snacks = snacks; }
    public String getDinner() { return dinner; }
    public void setDinner(String dinner) { this.dinner = dinner; }
    public double getDailyRate() { return dailyRate; }
    public void setDailyRate(double dailyRate) { this.dailyRate = dailyRate; }
}

