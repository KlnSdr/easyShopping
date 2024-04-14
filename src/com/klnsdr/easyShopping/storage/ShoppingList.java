package com.klnsdr.easyShopping.storage;

import com.klnsdr.easyShopping.storage.service.ListService;
import dobby.util.Json;
import janus.DataClass;
import janus.annotations.JanusList;
import janus.annotations.JanusString;
import janus.annotations.JanusUUID;
import thot.annotations.Bucket;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Bucket(ListService.BUCKET_NAME)
public class ShoppingList implements DataClass {
    @JanusString("name")
    private String name;
    @JanusUUID("id")
    private UUID id;
    @JanusList("products")
    private final List<Product> products = new ArrayList<>();

    public ShoppingList() {

    }

    public ShoppingList(String name) {
        this.name = name;
        this.id = UUID.randomUUID();
    }

    public void addProducts(List<Product> products) {
        this.products.addAll(products);
    }

    public void addProduct(Product product) {
        this.products.add(product);
    }

    @Override
    public String getKey() {
        return id.toString();
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<Product> getProducts() {
        return products;
    }

    @Override
    public Json toJson() {
        final Json json = new Json();
        json.setString("name", name);
        json.setString("id", id.toString());
        json.setList("products", products.stream().map(Product::toJson).collect(Collectors.toList()));
        return json;
    }
}
