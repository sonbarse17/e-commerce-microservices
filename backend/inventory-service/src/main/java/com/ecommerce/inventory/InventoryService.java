package com.ecommerce.inventory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public Inventory getInventory(Long productId) {
        return inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));
    }

    public boolean reserveStock(Long productId, Integer quantity) {
        Inventory inventory = getInventory(productId);
        int availableStock = inventory.getQuantity() - inventory.getReservedQuantity();
        
        if (availableStock >= quantity) {
            inventory.setReservedQuantity(inventory.getReservedQuantity() + quantity);
            inventory.setLastUpdated(LocalDateTime.now());
            inventoryRepository.save(inventory);
            return true;
        }
        return false;
    }

    public void releaseStock(Long productId, Integer quantity) {
        Inventory inventory = getInventory(productId);
        inventory.setReservedQuantity(Math.max(0, inventory.getReservedQuantity() - quantity));
        inventory.setLastUpdated(LocalDateTime.now());
        inventoryRepository.save(inventory);
    }

    public Inventory updateStock(Long productId, Integer quantity) {
        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElse(new Inventory());
        
        if (inventory.getId() == null) {
            inventory.setProductId(productId);
        }
        
        inventory.setQuantity(quantity);
        inventory.setLastUpdated(LocalDateTime.now());
        return inventoryRepository.save(inventory);
    }
}