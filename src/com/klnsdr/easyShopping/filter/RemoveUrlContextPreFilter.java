package com.klnsdr.easyShopping.filter;

import dobby.filter.Filter;
import dobby.filter.FilterType;
import dobby.io.HttpContext;
import dobby.io.response.ResponseCodes;
import dobby.util.Config;

import java.io.IOException;

public class RemoveUrlContextPreFilter implements Filter {
    @Override
    public String getName() {
        return "RemoveUrlContextPreFilter";
    }

    @Override
    public FilterType getType() {
        return FilterType.PRE;
    }

    @Override
    public int getOrder() {
        return -5;
    }

    @Override
    public boolean run(HttpContext httpContext) {
        final String path = httpContext.getRequest().getPath();
        String appContext = Config.getInstance().getString("application.data.context", null);

        if (appContext == null) {
            return true;
        }

        appContext = appContext.toLowerCase();

        if (!path.toLowerCase().startsWith(appContext)) {
            httpContext.getResponse().setCode(ResponseCodes.NOT_FOUND);
            return false;
        }

        final String newPath = path.substring(appContext.length());
        if (newPath.isEmpty()) {
            httpContext.getResponse().setHeader("Location", appContext + "/");
            httpContext.getResponse().setCode(ResponseCodes.FOUND);
            return false;
        }

        httpContext.getRequest().setPath(newPath);

        return true;
    }
}
