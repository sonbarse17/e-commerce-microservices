package com.ecommerce.analytics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:4200")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @PostMapping("/track")
    public ResponseEntity<Analytics> trackEvent(@RequestBody TrackEventRequest request) {
        return ResponseEntity.ok(analyticsService.trackEvent(request));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardData() {
        return ResponseEntity.ok(analyticsService.getDashboardData());
    }

    @GetMapping("/product/{productId}/views")
    public ResponseEntity<Long> getProductViews(@PathVariable Long productId) {
        return ResponseEntity.ok(analyticsService.getProductViews(productId));
    }

    @GetMapping("/popular-products")
    public ResponseEntity<Map<String, Object>> getPopularProducts() {
        return ResponseEntity.ok(analyticsService.getPopularProducts());
    }

    public static class TrackEventRequest {
        private String eventType;
        private Long userId;
        private Long productId;
        private String sessionId;
        private String userAgent;
        private String ipAddress;

        public String getEventType() { return eventType; }
        public void setEventType(String eventType) { this.eventType = eventType; }
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        public String getSessionId() { return sessionId; }
        public void setSessionId(String sessionId) { this.sessionId = sessionId; }
        public String getUserAgent() { return userAgent; }
        public void setUserAgent(String userAgent) { this.userAgent = userAgent; }
        public String getIpAddress() { return ipAddress; }
        public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    }
}