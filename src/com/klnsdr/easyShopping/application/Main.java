package com.klnsdr.easyShopping.application;

import dobby.annotations.Get;
import dobby.files.StaticFile;
import dobby.files.service.StaticFileService;
import dobby.io.HttpContext;
import dobby.io.response.Response;
import dobby.io.response.ResponseCodes;
import hades.Hades;

public class Main extends Hades {
    public static void main(String[] args) {
        new Main().startApplication(Main.class);
    }

    @Get("/share")
    public void sharedLink(HttpContext context) {
        final StaticFile indexFile = StaticFileService.getInstance().get("/index.html");

        final Response response = context.getResponse();

        if (indexFile != null) {
            response.setCode(ResponseCodes.OK);
            response.setHeader("Content-Type", indexFile.getContentType());
            response.setBody(indexFile.getContent());
        } else {
            response.setCode(ResponseCodes.NOT_FOUND);
            response.setBody("404 Not Found");
        }
    }
}
