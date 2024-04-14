package com.klnsdr.easyShopping.storage.service;

import com.klnsdr.easyShopping.storage.ShoppingList;
import dobby.util.Json;
import janus.Janus;
import thot.connector.Connector;

public class ListService {
    public static final String BUCKET_NAME = "easy_lists";
    private static ListService instance;

    private ListService() {
    }

    public static ListService getInstance() {
        if (instance == null) {
            instance = new ListService();
        }
        return instance;
    }

    public boolean update(ShoppingList list) {
        return Connector.write(BUCKET_NAME, list.getKey(), list.toJson());
    }

    public ShoppingList get(String key) {
        return Janus.parse(Connector.read(BUCKET_NAME, key, Json.class), ShoppingList.class);
    }
}
