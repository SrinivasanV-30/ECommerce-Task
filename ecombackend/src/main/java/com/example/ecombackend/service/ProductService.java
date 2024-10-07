package com.example.ecombackend.service;

import com.example.ecombackend.model.Product;
import com.example.ecombackend.DAO.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Page<Product> getProductsByCategory(Long categoryId, PageRequest pageRequest) {
        return productRepository.findByCategoryId(categoryId, pageRequest);
    }

    public Page<Product> getAllProducts(PageRequest pageRequest) {
        return productRepository.findAll(pageRequest);
    }

    public ObjResponse<Product> getProductById(Long id) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isPresent()) {
            return new ObjResponse<>(true, "Product found", productOptional.get());
        } else {
            return new ObjResponse<>(false, "Product not found", null);
        }
    }

    public Page<Product> getFilteredProducts(Long categoryId, PageRequest pageRequest,
                                             Double minPrice, Double maxPrice,
                                             Double minDiscount, Double maxDiscount,
                                             Integer minQuantity, Integer maxQuantity) {
        return productRepository.findProductsByFilters(categoryId, minPrice, maxPrice,
                                                       minDiscount, maxDiscount, minQuantity, maxQuantity, pageRequest);
    }

    public long countProducts() {
        return productRepository.count();
    }
}
