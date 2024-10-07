package com.example.ecombackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecombackend.model.Category;
import com.example.ecombackend.service.ApiResponse;
import com.example.ecombackend.service.CategoryService;
import com.example.ecombackend.service.ObjResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/countCategories")
    public ApiResponse countCategories() {
        return new ApiResponse(true, String.valueOf(categoryService.countCategories()));
    }

    
    @GetMapping("/categories")
    public ResponseEntity<ObjResponse<Page<Category>>> getAllCategories(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Category> categoryPage = categoryService.getAllCategories(PageRequest.of(page, size));
        return ResponseEntity.ok(new ObjResponse<>(true, "Categories retrieved successfully", categoryPage));
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<ObjResponse<Category>> getCategoryById(@PathVariable Long id) {
        ObjResponse<Category> response = categoryService.getCategoryById(id);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);  
        } else {
            return ResponseEntity.status(404).body(response);  
        }
    }
}
