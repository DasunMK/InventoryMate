package com.inventorymate.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "items")
public class Item {

    @Id
    private String id;
    private String name;
    private String category;
    private String barcode;
    private String brand;
    private String unitOfMeasure;
    private int minStockLevel;
    private double price;
    private String image;
    private int stock;
    private String expireDate;
}
