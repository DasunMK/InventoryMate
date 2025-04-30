package com.inventorymate.repository;

import com.inventorymate.model.GRN;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GRNRepository extends MongoRepository<GRN, String> {
    GRN findByGrnNumber(String grnNumber);
}
