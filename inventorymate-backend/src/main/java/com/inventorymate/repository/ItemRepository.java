package com.inventorymate.repository;

import com.inventorymate.model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends MongoRepository<Item, String> {
    // Custom query methods can be added here if needed
}
