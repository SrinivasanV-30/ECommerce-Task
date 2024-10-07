package com.example.ecombackend.response;
import java.util.*;
import com.example.ecombackend.model.ProductIndex;

public class ProductSearchResponse {
    private List<ProductIndex> primaryProducts;
    private List<ProductIndex> similarProducts;

   
    public ProductSearchResponse(List<ProductIndex> primaryProducts, List<ProductIndex> similarProducts) {
        this.primaryProducts = primaryProducts;
        this.similarProducts = similarProducts;
    }

    public List<ProductIndex> getPrimaryProducts() {
        return primaryProducts;
    }

    public void setPrimaryProducts(List<ProductIndex> primaryProducts) {
        this.primaryProducts = primaryProducts;
    }

    public List<ProductIndex> getSimilarProducts() {
        return similarProducts;
    }

    public void setSimilarProducts(List<ProductIndex> similarProducts) {
        this.similarProducts = similarProducts;
    }
}

