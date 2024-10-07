package com.example.ecombackend.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.ecombackend.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE "
            + "(:categoryId IS NULL OR p.category.id = :categoryId) AND "
            + "(:minPrice IS NULL OR p.mrp >= :minPrice) AND "
            + "(:maxPrice IS NULL OR p.mrp <= :maxPrice) AND "
            + "(:minDiscount IS NULL OR p.discount >= :minDiscount) AND "
            + "(:maxDiscount IS NULL OR p.discount <= :maxDiscount) AND "
            + "(:minQuantity IS NULL OR p.quantity >= :minQuantity) AND "
            + "(:maxQuantity IS NULL OR p.quantity <= :maxQuantity)")
    Page<Product> findProductsByFilters(@Param("categoryId") Long categoryId,
                                        @Param("minPrice") Double minPrice,
                                        @Param("maxPrice") Double maxPrice,
                                        @Param("minDiscount") Double minDiscount,
                                        @Param("maxDiscount") Double maxDiscount,
                                        @Param("minQuantity") Integer minQuantity,
                                        @Param("maxQuantity") Integer maxQuantity,
                                        Pageable pageable);
}
