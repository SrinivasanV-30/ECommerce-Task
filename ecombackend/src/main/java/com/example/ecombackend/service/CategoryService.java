package com.example.ecombackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.ecombackend.DAO.CategoryRepository;
import com.example.ecombackend.model.Category;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    
    public ObjResponse<List<Category>> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        if (!categories.isEmpty()) {
            return new ObjResponse<>(true, "Categories fetched successfully", categories);
        } else {
            return new ObjResponse<>(false, "No categories found", null);
        }
    }

  
    public long countCategories() {
        return categoryRepository.count();
    }

   
    public Page<Category> getAllCategories(PageRequest pageRequest) {
        return categoryRepository.findAll(pageRequest);
    }

   
    public ObjResponse<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .map(category -> new ObjResponse<>(true, "Category found", category))
                .orElseGet(() -> new ObjResponse<>(false, "Category not found", null));
    }
}
