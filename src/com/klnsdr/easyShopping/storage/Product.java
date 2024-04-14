package com.klnsdr.easyShopping.storage;

import dobby.util.Json;
import janus.DataClass;
import janus.annotations.JanusBoolean;
import janus.annotations.JanusInteger;
import janus.annotations.JanusString;

public class Product implements DataClass {
    @JanusString("n")
    private String name;
    @JanusString("s")
    private String section;
    @JanusBoolean("sl")
    private boolean selected;
    @JanusInteger("c")
    private int count;

    public Product() {

    }

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
