package com.example.ecombackend.controller;
import com.example.ecombackend.model.Product;
import com.example.ecombackend.service.ObjResponse;
import com.example.ecombackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/products")
public class ProductsController {
    @Autowired
    private ProductService productService;
    @GetMapping("/all")
    public ResponseEntity<ObjResponse<Page<Product>>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortField,
            @RequestParam(defaultValue = "asc") String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortField).ascending() :
                Sort.by(sortField).descending();
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        Page<Product> productPage = productService.getAllProducts(pageRequest);
        return ResponseEntity.ok(new ObjResponse<>(true, "Products retrieved successfully", productPage));
    }
    @GetMapping
    public ResponseEntity<ObjResponse<Page<Product>>> getProducts(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortField,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Double minDiscount,
            @RequestParam(required = false) Double maxDiscount,
            @RequestParam(required = false) Integer minQuantity,
            @RequestParam(required = false) Integer maxQuantity) {
     
        System.out.println("Received parameters - Category ID: " + categoryId + ", Page: " + page + ", Size: " + size +
                ", Sort Field: " + sortField + ", Sort Direction: " + sortDir +
                ", Min Price: " + minPrice + ", Max Price: " + maxPrice +
                ", Min Discount: " + minDiscount + ", Max Discount: " + maxDiscount +
                ", Min Quantity: " + minQuantity + ", Max Quantity: " + maxQuantity);
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortField).ascending() :
                Sort.by(sortField).descending();
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        Page<Product> productPage = productService.getFilteredProducts(
                categoryId, pageRequest, minPrice, maxPrice, minDiscount, maxDiscount, minQuantity, maxQuantity
        );
        return ResponseEntity.ok(new ObjResponse<>(true, "Products retrieved successfully", productPage));
    }
    @GetMapping("/{id}")
    public ResponseEntity<ObjResponse<Product>> getProductById(@PathVariable Long id) {
        ObjResponse<Product> response = productService.getProductById(id);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(404).body(response);
        }
    }
    @GetMapping("/count")
    public ResponseEntity<ObjResponse<Long>> countProducts() {
        long productCount = productService.countProducts();
        return ResponseEntity.ok(new ObjResponse<>(true, "Total products count", productCount));
    }
}