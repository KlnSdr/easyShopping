package com.klnsdr.easyShopping.storage.rest;

import com.klnsdr.easyShopping.storage.Product;
import com.klnsdr.easyShopping.storage.ShoppingList;
import com.klnsdr.easyShopping.storage.service.ListService;
import dobby.annotations.Get;
import dobby.annotations.Post;
import dobby.io.HttpContext;
import dobby.io.response.ResponseCodes;
import dobby.util.json.NewJson;
import common.logger.Logger;

import java.util.List;

public class ListResource {
    private static final String BASE_URL = "/rest/lists";
    private static final Logger LOGGER = new Logger(ListResource.class);

    @Post(BASE_URL)
    public void saveList(HttpContext context) {
        LOGGER.debug("creating new list");

        final NewJson payload = context.getRequest().getBody();

        if (!payload.hasKeys("name", "products")) {
            context.getResponse().setCode(ResponseCodes.BAD_REQUEST);
            final NewJson errorMessage = new NewJson();
            errorMessage.setString("msg", "missing required fields");
            return;
        }

        final ShoppingList list = getShoppingList(payload);

        final boolean success = ListService.getInstance().update(list);

        if (!success) {
            context.getResponse().setCode(ResponseCodes.INTERNAL_SERVER_ERROR);
            final NewJson errorMessage = new NewJson();
            errorMessage.setString("msg", "failed to save list");
            return;
        }


        final NewJson responsePayload = new NewJson();
        responsePayload.setString("id", list.getId().toString());

        context.getResponse().setBody(responsePayload);
        context.getResponse().setCode(ResponseCodes.CREATED);
    }

    private static ShoppingList getShoppingList(NewJson payload) {
        final String listName = payload.getString("name");
        final ShoppingList list = new ShoppingList(listName);
        final List<Object> products = payload.getList("products");

        for (Object product : products) {
            if (!(product instanceof NewJson)) {
                LOGGER.error("invalid product in list");
                continue;
            }

            final NewJson productJson = (NewJson) product;

            if (!productJson.hasKeys("n", "s", "sl", "c")) {
                LOGGER.error("missing required fields in product");
                continue;
            }

            final Product newProduct = new Product(
                    productJson.getString("n"),
                    productJson.getString("s"),
                    productJson.getBoolean("sl"),
                    productJson.getInt("c")
            );
            list.addProduct(newProduct);
        }
        return list;
    }

    @Get(BASE_URL + "/id/{listId}")
    public void getListById(HttpContext context) {
        final String listId = context.getRequest().getParam("listId");
        LOGGER.debug("getting list by id " + listId);

        final ShoppingList list = ListService.getInstance().get(listId);

        if (list == null) {
            context.getResponse().setCode(ResponseCodes.NOT_FOUND);
            final NewJson errorMessage = new NewJson();
            errorMessage.setString("msg", "list not found");
            return;
        }

        final NewJson responsePayload = list.toJson();
        // replace string booleans with actual booleans, because the custom JSON parser doesn't support booleans
        context.getResponse().setBody(responsePayload.toString().replaceAll("\"true\"", "true").replaceAll("\"false\"", "false"));
        context.getResponse().setHeader("Content-Type", "application/json; charset=utf-8");

    }
}
