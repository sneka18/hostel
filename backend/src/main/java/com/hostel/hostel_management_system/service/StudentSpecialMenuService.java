package com.hostel.hostel_management_system.service;

import com.hostel.hostel_management_system.model.Menu;
import com.hostel.hostel_management_system.model.StudentSpecialMenu;
import com.hostel.hostel_management_system.repository.MenuRepository;
import com.hostel.hostel_management_system.repository.StudentSpecialMenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentSpecialMenuService {

    @Autowired
    private StudentSpecialMenuRepository repository;

    @Autowired
    private MenuRepository menuRepository;

    public StudentSpecialMenu saveSelection(StudentSpecialMenu menuSelection) {
        // calculate fee from menu table
        Menu menu = menuRepository.findById(menuSelection.getMenuId()).orElse(null);
        if (menu == null) return null;

        double fee = 0;
        if (menuSelection.getSelectedSpecialMenu().contains(menu.getSpecialMenu1())) {
            fee += menu.getSpecial1Fee();
        }
        if (menuSelection.getSelectedSpecialMenu().contains(menu.getSpecialMenu2())) {
            fee += menu.getSpecial2Fee();
        }
        menuSelection.setFee(fee);
        return repository.save(menuSelection);
    }

    public List<StudentSpecialMenu> getByStudentId(Long studentId) {
        return repository.findByStudentId(studentId);
    }

    public List<StudentSpecialMenu> getAllWithSpecialMenuSelected() {
        return repository.findAll();
    }

    public double calculateTotalSpecialMenuFee(Long studentId) {
        List<StudentSpecialMenu> selected = repository.findByStudentId(studentId);
        return selected.stream().mapToDouble(StudentSpecialMenu::getFee).sum();
    }
}
