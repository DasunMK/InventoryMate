package com.inventorymate.controller;

import com.inventorymate.model.GRN;
import com.inventorymate.model.Item;
//import com.inventorymate.model.TemporaryItem;
import com.inventorymate.repository.GRNRepository;
import com.inventorymate.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/grn")
public class GRNController {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private GRNRepository grnRepository;

    @GetMapping("/items")
    public List<Item> getAllItems() {
        return itemRepository.findAll();  // Fetch all items
    }

    @PostMapping
    public GRN createGRN(@RequestBody GRN grn) {
        return grnRepository.save(grn);  // Save new GRN
    }

    @GetMapping("/{grnNumber}")
    public GRN getGRNByNumber(@PathVariable String grnNumber) {
        return grnRepository.findByGrnNumber(grnNumber);  // Get GRN by number
    }

    @PutMapping("/{grnNumber}")
    public GRN updateGRN(@PathVariable String grnNumber, @RequestBody GRN updatedGRN) {
        GRN grn = grnRepository.findByGrnNumber(grnNumber);
        if (grn != null) {
            grn.setDate(updatedGRN.getDate());
            grn.setItems(updatedGRN.getItems());
            return grnRepository.save(grn);  // Update GRN
        }
        return null;
    }
}
