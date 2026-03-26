package com.hostel.hostel_management_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hostel.hostel_management_system.model.Menu;
import com.hostel.hostel_management_system.service.MenuService;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:5173") 
public class MenuController {
    private final MenuService menuService;
    
    @Autowired
    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }
    
    @GetMapping("/day/{day}")
    public Menu getMenuByDay(@PathVariable String day) {
        return menuService.getMenuByDay(day);
    }
    
    @GetMapping("/all")
    public List<Menu> getAllMenus() {
        return menuService.getAllMenus();
    }
    
    @PostMapping
    public Menu addMenu(@RequestBody Menu menu) {
        return menuService.saveMenu(menu);
    }
    
    @DeleteMapping("/{id}")
    public void deleteMenu(@PathVariable Long id) {
        menuService.deleteMenu(id);
    }
    
    @GetMapping("/weekly-rate")
    public double getWeeklyRate() {
        return menuService.calculateWeeklyRate();
    }
}

