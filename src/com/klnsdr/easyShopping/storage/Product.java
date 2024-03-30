package com.klnsdr.easyShopping.storage;

import dobby.util.Json;
import hades.common.DataClass;

public class Product implements DataClass {
    private final String name;
    private final String section;
    private final boolean selected;
    private final int count;

    public Product(String name, String section, boolean selected, int count) {
        this.name = name;
        this.section = section;
        this.selected = selected;
        this.count = count;
    }

    @Override
    public String getKey() {
        return null;
    }

    @Override
    public Json toJson() {
        final Json json = new Json();
        json.setString("n", name);
        json.setString("s", section);
        json.setString("sl", selected ? "true" : "false");
        json.setInt("c", count);
        return json;
    }
}
