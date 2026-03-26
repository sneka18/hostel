package com.hostel.hostel_management_system.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hostel.hostel_management_system.model.Menu;
import com.hostel.hostel_management_system.repository.MenuRepository;

import java.util.List;

@Service
public class MenuService {
    private final MenuRepository menuRepository;
    
    @Autowired
    public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }
    
    public Menu getMenuByDay(String day) {
        return menuRepository.findByDay(day);
    }
    
    public List<Menu> getAllMenus() {
        return menuRepository.findAll();
    }
    
    public Menu saveMenu(Menu menu) {
        return menuRepository.save(menu);
    }
    
    public void deleteMenu(Long menu_id) {
        menuRepository.deleteById(menu_id);
    }
    
    public double calculateWeeklyRate() {
        List<Menu> menus = getAllMenus();
        return menus.stream().mapToDouble(Menu::getDailyRate).sum();
    }
}