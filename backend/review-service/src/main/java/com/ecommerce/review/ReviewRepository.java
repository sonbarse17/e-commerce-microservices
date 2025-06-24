package com.ecommerce.review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProductId(Long productId);
    List<Review> findByUserId(Long userId);
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.productId = ?1")
    Double findAverageRatingByProductId(Long productId);
}