package com.ecommerce.inventory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "http://localhost:4200")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/product/{productId}")
    public ResponseEntity<Inventory> getInventory(@PathVariable Long productId) {
        return ResponseEntity.ok(inventoryService.getInventory(productId));
    }

    @PostMapping("/reserve")
    public ResponseEntity<Boolean> reserveStock(@RequestBody ReserveRequest request) {
        return ResponseEntity.ok(inventoryService.reserveStock(request.getProductId(), request.getQuantity()));
    }

    @PostMapping("/release")
    public ResponseEntity<Void> releaseStock(@RequestBody ReserveRequest request) {
        inventoryService.releaseStock(request.getProductId(), request.getQuantity());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    public ResponseEntity<Inventory> updateStock(@RequestBody UpdateStockRequest request) {
        return ResponseEntity.ok(inventoryService.updateStock(request.getProductId(), request.getQuantity()));
    }

    public static class ReserveRequest {
        private Long productId;
        private Integer quantity;

        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    public static class UpdateStockRequest {
        private Long productId;
        private Integer quantity;

        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }
}