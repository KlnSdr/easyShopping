package com.klnsdr.easyShopping.storage.service;

import com.klnsdr.easyShopping.storage.ShoppingList;
import thot.connector.Connector;

public class ListService {
    public static final String BUCKET_NAME = "easy_lists";
    private static ListService instance;

    public static ListService getInstance() {
        if (instance == null) {
            instance = new ListService();
        }
        return instance;
    }

    private ListService() {
    }

    public boolean update(ShoppingList list) {
        return Connector.write(BUCKET_NAME, list.getKey(), list);
    }

    public ShoppingList get(String key) {
        return Connector.read(BUCKET_NAME, key, ShoppingList.class);
    }
}
