package com.klnsdr.easyShopping.storage;

import dobby.util.json.NewJson;
import thot.janus.DataClass;
import thot.janus.annotations.JanusBoolean;
import thot.janus.annotations.JanusInteger;
import thot.janus.annotations.JanusString;

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
    public NewJson toJson() {
        final NewJson json = new NewJson();
        json.setString("n", name);
        json.setString("s", section);
        json.setString("sl", selected ? "true" : "false");
        json.setInt("c", count);
        return json;
    }
}
