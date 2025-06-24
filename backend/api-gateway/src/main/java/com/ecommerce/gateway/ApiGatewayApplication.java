package com.ecommerce.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("user-service", r -> r.path("/api/users/**")
                        .uri("http://localhost:8081"))
                .route("product-service", r -> r.path("/api/products/**")
                        .uri("http://localhost:8082"))
                .route("inventory-service", r -> r.path("/api/inventory/**")
                        .uri("http://localhost:8083"))
                .route("order-service", r -> r.path("/api/orders/**")
                        .uri("http://localhost:8084"))
                .route("payment-service", r -> r.path("/api/payments/**")
                        .uri("http://localhost:8085"))
                .route("cart-service", r -> r.path("/api/cart/**")
                        .uri("http://localhost:8086"))
                .route("notification-service", r -> r.path("/api/notifications/**")
                        .uri("http://localhost:8087"))
                .route("review-service", r -> r.path("/api/reviews/**")
                        .uri("http://localhost:8088"))
                .route("analytics-service", r -> r.path("/api/analytics/**")
                        .uri("http://localhost:8089"))
                .build();
    }
}