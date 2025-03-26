package com.inventorymate.controller;

import com.inventorymate.model.Item;
import com.inventorymate.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    // Get all items
    @GetMapping
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    // Get a single item by ID
    @GetMapping("/{id}")
    public Item getItem(@PathVariable String id) {
        return itemRepository.findById(id).orElse(null);
    }

    // Create a new item
    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }

    // Update an existing item
    @PutMapping("/{id}")
    public Item updateItem(@PathVariable String id, @RequestBody Item item) {
        item.setId(id);
        return itemRepository.save(item);
    }

    // Delete an item
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable String id) {
        itemRepository.deleteById(id);
    }
}
