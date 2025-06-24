package com.ecommerce.analytics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnalyticsRepository extends JpaRepository<Analytics, Long> {
    Long countByEventType(String eventType);
    Long countByProductIdAndEventType(Long productId, String eventType);
}