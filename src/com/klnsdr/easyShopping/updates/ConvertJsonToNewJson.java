package com.klnsdr.easyShopping.updates;

import com.klnsdr.easyShopping.storage.service.ListService;
import dobby.util.Json;
import dobby.util.json.NewJson;
import common.logger.Logger;
import hades.update.Update;
import thot.connector.Connector;

import static dobby.util.JsonConverter.convert;

public class ConvertJsonToNewJson implements Update {
    private static final Logger LOGGER = new Logger(ConvertJsonToNewJson.class);

    @Override
    public boolean run() {
        final String BUCKET_NAME = ListService.BUCKET_NAME;
        final String[] keys = Connector.getKeys(BUCKET_NAME);
        for (String key : keys) {
            final Object maybeJson = Connector.read(BUCKET_NAME, key, Object.class);
            if (!(maybeJson instanceof Json)) {
                continue;
            }
            final NewJson newJson = convert((Json) maybeJson);
            if (!Connector.write(BUCKET_NAME, key, newJson)) {
                return false;
            }
        }
        return true;
    }

    @Override
    public String getName() {
        return "ES_ConvertJsonToNewJson";
    }

    @Override
    public int getOrder() {
        return 20;
    }
}
