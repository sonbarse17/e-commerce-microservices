package com.ecommerce.analytics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class AnalyticsService {

    @Autowired
    private AnalyticsRepository analyticsRepository;

    public Analytics trackEvent(AnalyticsController.TrackEventRequest request) {
        Analytics analytics = new Analytics();
        analytics.setEventType(request.getEventType());
        analytics.setUserId(request.getUserId());
        analytics.setProductId(request.getProductId());
        analytics.setSessionId(request.getSessionId());
        analytics.setUserAgent(request.getUserAgent());
        analytics.setIpAddress(request.getIpAddress());
        return analyticsRepository.save(analytics);
    }

    public Map<String, Object> getDashboardData() {
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("totalEvents", analyticsRepository.count());
        dashboard.put("pageViews", analyticsRepository.countByEventType("PAGE_VIEW"));
        dashboard.put("productViews", analyticsRepository.countByEventType("PRODUCT_VIEW"));
        dashboard.put("purchases", analyticsRepository.countByEventType("PURCHASE"));
        return dashboard;
    }

    public Long getProductViews(Long productId) {
        return analyticsRepository.countByProductIdAndEventType(productId, "PRODUCT_VIEW");
    }

    public Map<String, Object> getPopularProducts() {
        Map<String, Object> result = new HashMap<>();
        result.put("message", "Popular products data would be calculated here");
        return result;
    }
}