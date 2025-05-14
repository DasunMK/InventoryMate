
package com.inventorymate.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.inventorymate.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    // Custom query methods if needed
}
