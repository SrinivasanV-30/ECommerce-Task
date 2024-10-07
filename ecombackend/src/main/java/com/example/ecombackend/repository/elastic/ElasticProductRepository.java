package com.example.ecombackend.repository.elastic;
import com.example.ecombackend.model.ProductIndex;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import java.math.BigDecimal;
import java.util.List;
public interface ElasticProductRepository extends ElasticsearchRepository<ProductIndex, String> {
    List<ProductIndex> findByNameContaining(String name);
    List<ProductIndex> findByDescriptionContaining(String description);
    List<ProductIndex> findByCategoryContaining(String category);
    List<ProductIndex> findByMrpBetween(BigDecimal minMrp, BigDecimal maxMrp);
    @Query("{\"match_phrase\": {\"name\": \"?0\"}}")
    List<ProductIndex> findByNameMatchPhrase(String name);
    @Query("{\"match_phrase\": {\"category\": \"?0\"}}")
    List<ProductIndex> findByCategoryMatchPhrase(String category);
    @Query("{\"match_phrase\": {\"description\": \"?0\"}}")
    List<ProductIndex> findByDescriptionMatchPhrase(String description);
  
    
}