package com.inventorymate.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "grns")
public class GRN {
    @Id
    private String id;
    private String grnNumber;
    private String date;
    private List<TemporaryItem> items;  // Items in this GRN

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getGrnNumber() {
        return grnNumber;
    }

    public void setGrnNumber(String grnNumber) {
        this.grnNumber = grnNumber;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<TemporaryItem> getItems() {
        return items;
    }

    public void setItems(List<TemporaryItem> items) {
        this.items = items;
    }
}
