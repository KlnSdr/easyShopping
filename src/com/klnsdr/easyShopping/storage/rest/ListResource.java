package com.klnsdr.easyShopping.storage.rest;

import com.klnsdr.easyShopping.storage.Product;
import com.klnsdr.easyShopping.storage.ShoppingList;
import com.klnsdr.easyShopping.storage.service.ListService;
import dobby.annotations.Get;
import dobby.annotations.Post;
import dobby.io.HttpContext;
import dobby.io.response.ResponseCodes;
import dobby.util.Json;
import dobby.util.logging.Logger;

public class ListResource {
    private static final int PAGE_SIZE = 30;
    private static final String BASE_URL = "/rest/lists";
    private static final Logger LOGGER = new Logger(ListResource.class);

    @Post(BASE_URL)
    public void saveList(HttpContext context) {
        LOGGER.debug("creating new list");
        final Json payload = context.getRequest().getBody();
        final String listName = payload.getString("name");

        final ShoppingList list = new ShoppingList(listName);

        final Json products = payload.getJson("products");
        addAllProducts(list, products, 0);

        final boolean success = ListService.getInstance().update(list);

        if (!success) {
            context.getResponse().setCode(ResponseCodes.INTERNAL_SERVER_ERROR);
            final Json errorMessage = new Json();
            errorMessage.setString("msg", "failed to save list");
            return;
        }


        final Json responsePayload = new Json();
        responsePayload.setString("id", list.getId().toString());

        context.getResponse().setBody(responsePayload);
        context.getResponse().setCode(ResponseCodes.CREATED);
    }

    @Post(BASE_URL + "/id/{listId}/page/{pageNumber}")
    public void appendPageToList(HttpContext context) {
        final int pageNumber;
        try {
            pageNumber = Integer.parseInt(context.getRequest().getParam("pageNumber"));
        } catch (NumberFormatException e) {
            context.getResponse().setCode(ResponseCodes.BAD_REQUEST);
            final Json errorMessage = new Json();
            errorMessage.setString("msg", "invalid page number");
            return;
        }

        final String listId = context.getRequest().getParam("listId");
        LOGGER.debug("appending page to list " + listId);

        final ShoppingList list = ListService.getInstance().get(listId);

        if (list == null) {
            context.getResponse().setCode(ResponseCodes.NOT_FOUND);
            final Json errorMessage = new Json();
            errorMessage.setString("msg", "list not found");
            return;
        }

        final Json payload = context.getRequest().getBody();
        final Json products = payload.getJson("products");
        addAllProducts(list, products, pageNumber * PAGE_SIZE);

        final boolean success = ListService.getInstance().update(list);

        if (!success) {
            context.getResponse().setCode(ResponseCodes.INTERNAL_SERVER_ERROR);
            final Json errorMessage = new Json();
            errorMessage.setString("msg", "failed to save list");
            return;
        }

        final Json responsePayload = new Json();
        responsePayload.setString("id", listId);

        context.getResponse().setBody(responsePayload);
    }

    @Get(BASE_URL + "/id/{listId}")
    public void getListById(HttpContext context) {
        final String listId = context.getRequest().getParam("listId");
        LOGGER.debug("getting list by id " + listId);

        final ShoppingList list = ListService.getInstance().get(listId);

        if (list == null) {
            context.getResponse().setCode(ResponseCodes.NOT_FOUND);
            final Json errorMessage = new Json();
            errorMessage.setString("msg", "list not found");
            return;
        }

        final Json responsePayload = list.toJson();
        // replace string booleans with actual booleans, because the custom JSON parser doesn't support booleans
        context.getResponse().setBody(responsePayload.toString().replaceAll("\"true\"", "true").replaceAll("\"false\"", "false"));
        context.getResponse().setHeader("Content-Type", "application/json; charset=utf-8");

    }

    private void addAllProducts(ShoppingList list, Json products, int startIndex) {
        int i = startIndex;
        while (products.hasKey("product" + i)) {
            final Json product = products.getJson("product" + i);
            final String name = product.getString("n");
            final String section = product.getString("s");
            final boolean selected = product.getString("sl").equals("true");
            final int count = product.getInt("c");

            list.addProduct(new Product(name, section, selected, count));
            i++;
        }
    }
}
