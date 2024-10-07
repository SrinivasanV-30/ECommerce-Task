package com.example.ecombackend.DAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.ecombackend.model.Category;
import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {   
    List<Category> findByNameContainingIgnoreCase(String name);
    Page<Category> findAll(Pageable pageable);
}
